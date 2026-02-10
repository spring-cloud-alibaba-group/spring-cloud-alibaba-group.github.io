import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';
const curFilename = fileURLToPath(import.meta.url);
const curDirname = path.dirname(curFilename);

const starlightPath = path.join(curDirname, 'node_modules/@astrojs/starlight');

// 获取docs目录下的一级文件夹
let docsFile = await fs.readdir('src/content/docs');
docsFile = docsFile.filter((item) => item !== '.DS_Store')
// 按长度降序排序，确保正则匹配时长模式优先（如 2025.1.x 在 2025 之前匹配）
docsFile.sort((a, b) => b.length - a.length)

/**
 * @description: 替换 utils/route-data.ts
 * 传递 categories 参数
 */
const replaceRouteData = async () => {
	const originFile = path.join(starlightPath, "/utils/route-data.ts");
	const originContent = await fs.readFile(originFile);
	const replacedContent = originContent.toString().replace(
		/const sidebar = getSidebar.*?;\n/,
		'const sidebar = getSidebar(url.pathname, locale, props.categories);\n'
	);
	await fs.writeFile(originFile, replacedContent);
}


/**
 * @description: 替换 utils/navigation.ts
 *
 */
const replaceNavigation = async () => {
	const originFile = path.join(starlightPath, "/utils/navigation.ts");
	const originContent = (await fs.readFile(originFile)).toString();
	const isPatched = originContent.includes('categories: any');

	if (isPatched) {
		/**
		 * 已经打过补丁，只需更新版本列表
		 * 从 versionRegex 行提取旧版本列表，然后全部替换为新列表
		 */
		let content = originContent;
		const versionMatch = content.match(/versionRegex = \/.*?\(([^)]+)\)/);
		if (versionMatch && versionMatch[1]) {
			const oldList = versionMatch[1];
			const newList = docsFile.join('|');
			if (oldList !== newList) {
				content = content.replaceAll(oldList, newList);
			}
		}

		// linkFromRoute 的正则已经是幂等的，可以直接重新应用
		const linkFromRouteRegex = /function linkFromRoute\(route: Route, currentPathname: string\): Link {[\s\S]*?}/;
		content = content.replace(
			linkFromRouteRegex,
			`function linkFromRoute(route: Route, currentPathname: string): Link {
			return makeLink(
				slugToPathname(route.slug,route.id),
				route.entry.data.sidebar.label || route.entry.data.title,
				currentPathname,
				route.entry.data.sidebar.badge,
				route.entry.data.sidebar.attrs
			);
		}\n`
		);

		await fs.writeFile(originFile, content);
		return;
	}

	/**
	 * 首次打补丁 - 原始逻辑
	 * 获取当前页面的 sidebar， 左侧菜单动态加载
	 * 根据页面路由获取sidebar
	 */
	const sideBarRegex = /export function getSidebar\(pathname\: string\, locale\: string \| undefined\).+\n(.+)/;
	const sideBarContent = originContent.replace(
		sideBarRegex,
		`export function getSidebar(pathname: string, locale: string | undefined, categories: any): SidebarEntry[] {
		const routes = getLocaleRoutes(locale);
		const versionRegex = /\\/docs\\/(${docsFile.join('|')})\\//;
		const match = versionRegex.exec(pathname);
		const version = match ? match[1] : 'latest';
		if(categories && categories[version]){
			return categories[version].map((group) => configItemToEntry(group, pathname, locale, routes));
		}\n`
	);

	/**
	 * 核心的 sidebar Link链接构建
	 */
	/**
	 * /v2/en/quickstart/quick-start-docker.html => /docs/v2/quickstart/quick-start-docker.html
	 * /v2/zh-cn/quickstart/quick-start-kubernetes.html => /docs/v2/quickstart/quick-start-docker.html
	 */
	const sideBarLinkRegex = /href = formatPath\(href\).+\n.+\}/;
	const sideBarLinkContent = sideBarContent.replace(
		sideBarLinkRegex,
		`href = formatPath(href);
		const regex = /\\/(${docsFile.join('|')})\\/(en|zh-cn)/;
		href = href.replace(regex, '/docs/$1');
		}`
	);

	/**
	 * 核心的 localeDir链接构建
	 */
	/**
	 * /v2/en/quickstart/quick-start-docker.html => /docs/v2/quickstart/quick-start-docker.html
	 * /v2/zh-cn/quickstart/quick-start-kubernetes.html => /docs/v2/quickstart/quick-start-docker.html
	 */
	const localeDirRegex = /const localeDir = locale \? locale \+ \'\/\' \+ directory \: directory\;/;
	const localeDirContent = sideBarLinkContent.replace(
		localeDirRegex,
		`const regex =  /(${docsFile.join('|')})\\/(en|zh-cn)/;
		const localeDir = locale ? locale + '/' + directory.replace(regex, "$1/"+locale) : directory;`
	);


	// 增加slugToPathname的入参，为版本号中有.的版本设置正确的sidebar路径
	// slug.id => docs/2.2.x/quickstart/quick-start-docker.md
	// slug.slug => 22x/quickstart/quick-start-docker
	const linkFromRouteRegex = /function linkFromRoute\(route: Route, currentPathname: string\): Link {[\s\S]*?}/;

	const linkFromRouteContent = localeDirContent.replace(
		linkFromRouteRegex,
		`function linkFromRoute(route: Route, currentPathname: string): Link {
			return makeLink(
				slugToPathname(route.slug,route.id),
				route.entry.data.sidebar.label || route.entry.data.title,
				currentPathname,
				route.entry.data.sidebar.badge,
				route.entry.data.sidebar.attrs
			);
		}\n`
	)

	await fs.writeFile(originFile, linkFromRouteContent);
}

/**
 * @description: 替换 index.astro
 * 1. 动态替换核心路由能力
 * 2. 动态集成siderBar能力
 */
const replaceIndexAstro = async () => {
	const originFile = path.join(starlightPath, "index.astro");
	const replacedContent = await fs.readFile('./template/index.startlight.tpl');
	const updateContent =replacedContent.toString().replaceAll(
		'DOCSREGEX',
		`${docsFile.join('|')}`
	)
	await fs.writeFile(originFile, updateContent);
}

/**
 * @description: 替换 404.astro
 */
const replace404Astro = async () => {
	const originFile = path.join(starlightPath, "404.astro");
	const replacedContent = await fs.readFile('./template/404.startlight.tpl');
	await fs.writeFile(originFile, replacedContent.toString());
}


/**
 * @description: 替换 utils/slugs.ts
 */
const replaceSlugs = async () => {
	const originFile = path.join(starlightPath, "/utils/slugs.ts");
	const originContent = (await fs.readFile(originFile)).toString();

	// 动态计算需要特殊处理的版本：名称中包含 . 的版本目录 + developer + ebook
	const dotVersions = docsFile.filter(f => f.includes('.'));
	const slugVersionList = [...dotVersions, 'developer', 'ebook'].join('|');

	const isPatched = originContent.includes('slugToPathname(slug: string, id: string)');

	if (isPatched) {
		/**
		 * 已经打过补丁，只需更新版本正则
		 */
		let content = originContent;
		content = content.replace(
			/const regex = \/([^/]+)\/;/,
			`const regex = /${slugVersionList}/;`
		);
		await fs.writeFile(originFile, content);
		return;
	}

	/**
	 * 首次打补丁 - 原始逻辑
	 * 获取当前页面的 id，生成正确的 pathname
	 * 主要为2.2.x版本的autogenerate生成正确的sidebar
	 */
	const linkFromRouteRegex = /export function slugToPathname\(slug\: string\)\: string {[\s\S]*?}/;
	const linkFromRouteContent = originContent.replace(
		linkFromRouteRegex,
		`export function slugToPathname(slug: string, id: string): string {
			// 2.2.x/zh-cn/overview/version-explain.md
			let param = slugToParam(slug);
			const regex = /${slugVersionList}/;
			const [curVersion,lang, ...rest] = id.split('/');
			const match = regex.exec(curVersion);
			if (match) {
				rest[rest.length-1] = rest[rest.length-1].replace(/.(md|mdx)$/, "")
				param = "docs/" + curVersion + "/" + rest.join("/")
			}
			return param ? '/' + param + '/' : '/';
		}\n`
	)

	await fs.writeFile(originFile, linkFromRouteContent);
}


export default async () => {
	await replaceRouteData();
	await replaceNavigation();
	await replaceIndexAstro();
	await replace404Astro();
	await replaceSlugs()
}