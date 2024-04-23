declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"Graalvm-metadata.md": {
	id: "Graalvm-metadata.md";
  slug: "graalvm-metadata";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"IP-Protocal-Migration.md": {
	id: "IP-Protocal-Migration.md";
  slug: "ip-protocal-migration";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"RocketMQ-adapt-Graalvm.md": {
	id: "RocketMQ-adapt-Graalvm.md";
  slug: "rocketmq-adapt-graalvm";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"SCA-2022.0.0.0-version-released.md": {
	id: "SCA-2022.0.0.0-version-released.md";
  slug: "sca-2022000-version-released";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"SCA-Higress-Application-Deployment.md": {
	id: "SCA-Higress-Application-Deployment.md";
  slug: "sca-higress-application-deployment";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"SCA-Higress-Routing.md": {
	id: "SCA-Higress-Routing.md";
  slug: "sca-higress-routing";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"SCA-Proxyless-Mesh.md": {
	id: "SCA-Proxyless-Mesh.md";
  slug: "sca-proxyless-mesh";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"SCA-best-practice.md": {
	id: "SCA-best-practice.md";
  slug: "sca-best-practice";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"learning/spring-boot/core.md": {
	id: "learning/spring-boot/core.md";
  slug: "learning/spring-boot/core";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"learning/spring-cloud/spring-cloud-commons.md": {
	id: "learning/spring-cloud/spring-cloud-commons.md";
  slug: "learning/spring-cloud/spring-cloud-commons";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"learning/spring-cloud/spring-cloud-context.md": {
	id: "learning/spring-cloud/spring-cloud-context.md";
  slug: "learning/spring-cloud/spring-cloud-context";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"learning/spring/core/aop-api.md": {
	id: "learning/spring/core/aop-api.md";
  slug: "learning/spring/core/aop-api";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"learning/spring/core/aop.md": {
	id: "learning/spring/core/aop.md";
  slug: "learning/spring/core/aop";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"learning/spring/core/ioc.md": {
	id: "learning/spring/core/ioc.md";
  slug: "learning/spring/core/ioc";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"learning/spring/core/resources.md": {
	id: "learning/spring/core/resources.md";
  slug: "learning/spring/core/resources";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"learning/spring/integration/cache.md": {
	id: "learning/spring/integration/cache.md";
  slug: "learning/spring/integration/cache";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"learning/spring/integration/scheduling.md": {
	id: "learning/spring/integration/scheduling.md";
  slug: "learning/spring/integration/scheduling";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"learning/spring/web-servlet/mvc.md": {
	id: "learning/spring/web-servlet/mvc.md";
  slug: "learning/spring/web-servlet/mvc";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"learning/spring/web-servlet/rest-clients.md": {
	id: "learning/spring/web-servlet/rest-clients.md";
  slug: "learning/spring/web-servlet/rest-clients";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"news/attend-a-meeting.md": {
	id: "news/attend-a-meeting.md";
  slug: "news/attend-a-meeting";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"news/ospp-2024.md": {
	id: "news/ospp-2024.md";
  slug: "news/ospp-2024";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"release-nacos110.md": {
	id: "release-nacos110.md";
  slug: "release-nacos110";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"release-nacos132.md": {
	id: "release-nacos132.md";
  slug: "release-nacos132";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"spring-boot-to-spring-cloud-best-practice.md": {
	id: "spring-boot-to-spring-cloud-best-practice.md";
  slug: "spring-boot-to-spring-cloud-best-practice";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"docs": {
"2.2.x/en/best-practice/integrated-example.md": {
	id: "2.2.x/en/best-practice/integrated-example.md";
  slug: "22x/en/best-practice/integrated-example";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/best-practice/spring-boot-to-spring-cloud.md": {
	id: "2.2.x/en/best-practice/spring-boot-to-spring-cloud.md";
  slug: "22x/en/best-practice/spring-boot-to-spring-cloud";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/overview/faq.md": {
	id: "2.2.x/en/overview/faq.md";
  slug: "22x/en/overview/faq";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/overview/version-explain.md": {
	id: "2.2.x/en/overview/version-explain.md";
  slug: "22x/en/overview/version-explain";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/overview/what-is-sca.md": {
	id: "2.2.x/en/overview/what-is-sca.md";
  slug: "22x/en/overview/what-is-sca";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/nacos/advanced-guide.md": {
	id: "2.2.x/en/user-guide/nacos/advanced-guide.md";
  slug: "22x/en/user-guide/nacos/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/nacos/overview.md": {
	id: "2.2.x/en/user-guide/nacos/overview.md";
  slug: "22x/en/user-guide/nacos/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/nacos/quick-start.md": {
	id: "2.2.x/en/user-guide/nacos/quick-start.md";
  slug: "22x/en/user-guide/nacos/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/rocketmq/advanced-guide.md": {
	id: "2.2.x/en/user-guide/rocketmq/advanced-guide.md";
  slug: "22x/en/user-guide/rocketmq/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/rocketmq/overview.md": {
	id: "2.2.x/en/user-guide/rocketmq/overview.md";
  slug: "22x/en/user-guide/rocketmq/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/rocketmq/quick-start.md": {
	id: "2.2.x/en/user-guide/rocketmq/quick-start.md";
  slug: "22x/en/user-guide/rocketmq/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/seata/advanced-guide.md": {
	id: "2.2.x/en/user-guide/seata/advanced-guide.md";
  slug: "22x/en/user-guide/seata/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/seata/overview.md": {
	id: "2.2.x/en/user-guide/seata/overview.md";
  slug: "22x/en/user-guide/seata/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/seata/quick-start.md": {
	id: "2.2.x/en/user-guide/seata/quick-start.md";
  slug: "22x/en/user-guide/seata/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/sentinel/advanced-guide.md": {
	id: "2.2.x/en/user-guide/sentinel/advanced-guide.md";
  slug: "22x/en/user-guide/sentinel/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/sentinel/overview.md": {
	id: "2.2.x/en/user-guide/sentinel/overview.md";
  slug: "22x/en/user-guide/sentinel/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/sentinel/quick-start.md": {
	id: "2.2.x/en/user-guide/sentinel/quick-start.md";
  slug: "22x/en/user-guide/sentinel/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/service-governance/service-security/advanced-guide.md": {
	id: "2.2.x/en/user-guide/service-governance/service-security/advanced-guide.md";
  slug: "22x/en/user-guide/service-governance/service-security/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/service-governance/service-security/overview.md": {
	id: "2.2.x/en/user-guide/service-governance/service-security/overview.md";
  slug: "22x/en/user-guide/service-governance/service-security/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/service-governance/service-security/quick-start.md": {
	id: "2.2.x/en/user-guide/service-governance/service-security/quick-start.md";
  slug: "22x/en/user-guide/service-governance/service-security/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/service-governance/traffic-management/advanced-guide.md": {
	id: "2.2.x/en/user-guide/service-governance/traffic-management/advanced-guide.md";
  slug: "22x/en/user-guide/service-governance/traffic-management/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/service-governance/traffic-management/overview.md": {
	id: "2.2.x/en/user-guide/service-governance/traffic-management/overview.md";
  slug: "22x/en/user-guide/service-governance/traffic-management/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/service-governance/traffic-management/quick-start.md": {
	id: "2.2.x/en/user-guide/service-governance/traffic-management/quick-start.md";
  slug: "22x/en/user-guide/service-governance/traffic-management/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/sidecar/advanced-guide.md": {
	id: "2.2.x/en/user-guide/sidecar/advanced-guide.md";
  slug: "22x/en/user-guide/sidecar/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/sidecar/overview.md": {
	id: "2.2.x/en/user-guide/sidecar/overview.md";
  slug: "22x/en/user-guide/sidecar/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/en/user-guide/sidecar/quick-start.md": {
	id: "2.2.x/en/user-guide/sidecar/quick-start.md";
  slug: "22x/en/user-guide/sidecar/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/best-practice/integrated-example.md": {
	id: "2.2.x/zh-cn/best-practice/integrated-example.md";
  slug: "22x/zh-cn/best-practice/integrated-example";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/best-practice/spring-boot-to-spring-cloud.md": {
	id: "2.2.x/zh-cn/best-practice/spring-boot-to-spring-cloud.md";
  slug: "22x/zh-cn/best-practice/spring-boot-to-spring-cloud";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/overview/faq.md": {
	id: "2.2.x/zh-cn/overview/faq.md";
  slug: "22x/zh-cn/overview/faq";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/overview/version-explain.md": {
	id: "2.2.x/zh-cn/overview/version-explain.md";
  slug: "22x/zh-cn/overview/version-explain";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/overview/what-is-sca.md": {
	id: "2.2.x/zh-cn/overview/what-is-sca.md";
  slug: "22x/zh-cn/overview/what-is-sca";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/nacos/advanced-guide.md": {
	id: "2.2.x/zh-cn/user-guide/nacos/advanced-guide.md";
  slug: "22x/zh-cn/user-guide/nacos/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/nacos/overview.md": {
	id: "2.2.x/zh-cn/user-guide/nacos/overview.md";
  slug: "22x/zh-cn/user-guide/nacos/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/nacos/quick-start.md": {
	id: "2.2.x/zh-cn/user-guide/nacos/quick-start.md";
  slug: "22x/zh-cn/user-guide/nacos/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/rocketmq/advanced-guide.md": {
	id: "2.2.x/zh-cn/user-guide/rocketmq/advanced-guide.md";
  slug: "22x/zh-cn/user-guide/rocketmq/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/rocketmq/overview.md": {
	id: "2.2.x/zh-cn/user-guide/rocketmq/overview.md";
  slug: "22x/zh-cn/user-guide/rocketmq/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/rocketmq/quick-start.md": {
	id: "2.2.x/zh-cn/user-guide/rocketmq/quick-start.md";
  slug: "22x/zh-cn/user-guide/rocketmq/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/seata/advanced-guide.md": {
	id: "2.2.x/zh-cn/user-guide/seata/advanced-guide.md";
  slug: "22x/zh-cn/user-guide/seata/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/seata/overview.md": {
	id: "2.2.x/zh-cn/user-guide/seata/overview.md";
  slug: "22x/zh-cn/user-guide/seata/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/seata/quick-start.md": {
	id: "2.2.x/zh-cn/user-guide/seata/quick-start.md";
  slug: "22x/zh-cn/user-guide/seata/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/sentinel/advanced-guide.md": {
	id: "2.2.x/zh-cn/user-guide/sentinel/advanced-guide.md";
  slug: "22x/zh-cn/user-guide/sentinel/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/sentinel/overview.md": {
	id: "2.2.x/zh-cn/user-guide/sentinel/overview.md";
  slug: "22x/zh-cn/user-guide/sentinel/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/sentinel/quick-start.md": {
	id: "2.2.x/zh-cn/user-guide/sentinel/quick-start.md";
  slug: "22x/zh-cn/user-guide/sentinel/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/service-governance/service-security/advanced-guide.md": {
	id: "2.2.x/zh-cn/user-guide/service-governance/service-security/advanced-guide.md";
  slug: "22x/zh-cn/user-guide/service-governance/service-security/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/service-governance/service-security/overview.md": {
	id: "2.2.x/zh-cn/user-guide/service-governance/service-security/overview.md";
  slug: "22x/zh-cn/user-guide/service-governance/service-security/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/service-governance/service-security/quick-start.md": {
	id: "2.2.x/zh-cn/user-guide/service-governance/service-security/quick-start.md";
  slug: "22x/zh-cn/user-guide/service-governance/service-security/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/service-governance/traffic-management/advanced-guide.md": {
	id: "2.2.x/zh-cn/user-guide/service-governance/traffic-management/advanced-guide.md";
  slug: "22x/zh-cn/user-guide/service-governance/traffic-management/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/service-governance/traffic-management/overview.md": {
	id: "2.2.x/zh-cn/user-guide/service-governance/traffic-management/overview.md";
  slug: "22x/zh-cn/user-guide/service-governance/traffic-management/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/service-governance/traffic-management/quick-start.md": {
	id: "2.2.x/zh-cn/user-guide/service-governance/traffic-management/quick-start.md";
  slug: "22x/zh-cn/user-guide/service-governance/traffic-management/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/sidecar/advanced-guide.md": {
	id: "2.2.x/zh-cn/user-guide/sidecar/advanced-guide.md";
  slug: "22x/zh-cn/user-guide/sidecar/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/sidecar/overview.md": {
	id: "2.2.x/zh-cn/user-guide/sidecar/overview.md";
  slug: "22x/zh-cn/user-guide/sidecar/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2.2.x/zh-cn/user-guide/sidecar/quick-start.md": {
	id: "2.2.x/zh-cn/user-guide/sidecar/quick-start.md";
  slug: "22x/zh-cn/user-guide/sidecar/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/best-practice/integrated-example.md": {
	id: "2021/en/best-practice/integrated-example.md";
  slug: "2021/en/best-practice/integrated-example";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/best-practice/spring-boot-to-spring-cloud.md": {
	id: "2021/en/best-practice/spring-boot-to-spring-cloud.md";
  slug: "2021/en/best-practice/spring-boot-to-spring-cloud";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/overview/faq.md": {
	id: "2021/en/overview/faq.md";
  slug: "2021/en/overview/faq";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/overview/version-explain.md": {
	id: "2021/en/overview/version-explain.md";
  slug: "2021/en/overview/version-explain";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/overview/what-is-sca.md": {
	id: "2021/en/overview/what-is-sca.md";
  slug: "2021/en/overview/what-is-sca";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/user-guide/nacos/advanced-guide.md": {
	id: "2021/en/user-guide/nacos/advanced-guide.md";
  slug: "2021/en/user-guide/nacos/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/user-guide/nacos/overview.md": {
	id: "2021/en/user-guide/nacos/overview.md";
  slug: "2021/en/user-guide/nacos/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/user-guide/nacos/quick-start.md": {
	id: "2021/en/user-guide/nacos/quick-start.md";
  slug: "2021/en/user-guide/nacos/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/user-guide/rocketmq/advanced-guide.md": {
	id: "2021/en/user-guide/rocketmq/advanced-guide.md";
  slug: "2021/en/user-guide/rocketmq/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/user-guide/rocketmq/overview.md": {
	id: "2021/en/user-guide/rocketmq/overview.md";
  slug: "2021/en/user-guide/rocketmq/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/user-guide/rocketmq/quick-start.md": {
	id: "2021/en/user-guide/rocketmq/quick-start.md";
  slug: "2021/en/user-guide/rocketmq/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/user-guide/seata/advanced-guide.md": {
	id: "2021/en/user-guide/seata/advanced-guide.md";
  slug: "2021/en/user-guide/seata/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/user-guide/seata/overview.md": {
	id: "2021/en/user-guide/seata/overview.md";
  slug: "2021/en/user-guide/seata/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/user-guide/seata/quick-start.md": {
	id: "2021/en/user-guide/seata/quick-start.md";
  slug: "2021/en/user-guide/seata/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/user-guide/sentinel/advanced-guide.md": {
	id: "2021/en/user-guide/sentinel/advanced-guide.md";
  slug: "2021/en/user-guide/sentinel/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/user-guide/sentinel/overview.md": {
	id: "2021/en/user-guide/sentinel/overview.md";
  slug: "2021/en/user-guide/sentinel/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/user-guide/sentinel/quick-start.md": {
	id: "2021/en/user-guide/sentinel/quick-start.md";
  slug: "2021/en/user-guide/sentinel/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/user-guide/sidecar/advanced-guide.md": {
	id: "2021/en/user-guide/sidecar/advanced-guide.md";
  slug: "2021/en/user-guide/sidecar/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/user-guide/sidecar/overview.md": {
	id: "2021/en/user-guide/sidecar/overview.md";
  slug: "2021/en/user-guide/sidecar/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/en/user-guide/sidecar/quick-start.md": {
	id: "2021/en/user-guide/sidecar/quick-start.md";
  slug: "2021/en/user-guide/sidecar/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/best-practice/integrated-example.md": {
	id: "2021/zh-cn/best-practice/integrated-example.md";
  slug: "2021/zh-cn/best-practice/integrated-example";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/best-practice/spring-boot-to-spring-cloud.md": {
	id: "2021/zh-cn/best-practice/spring-boot-to-spring-cloud.md";
  slug: "2021/zh-cn/best-practice/spring-boot-to-spring-cloud";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/overview/faq.md": {
	id: "2021/zh-cn/overview/faq.md";
  slug: "2021/zh-cn/overview/faq";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/overview/version-explain.md": {
	id: "2021/zh-cn/overview/version-explain.md";
  slug: "2021/zh-cn/overview/version-explain";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/overview/what-is-sca.md": {
	id: "2021/zh-cn/overview/what-is-sca.md";
  slug: "2021/zh-cn/overview/what-is-sca";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/user-guide/nacos/advanced-guide.md": {
	id: "2021/zh-cn/user-guide/nacos/advanced-guide.md";
  slug: "2021/zh-cn/user-guide/nacos/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/user-guide/nacos/overview.md": {
	id: "2021/zh-cn/user-guide/nacos/overview.md";
  slug: "2021/zh-cn/user-guide/nacos/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/user-guide/nacos/quick-start.md": {
	id: "2021/zh-cn/user-guide/nacos/quick-start.md";
  slug: "2021/zh-cn/user-guide/nacos/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/user-guide/rocketmq/advanced-guide.md": {
	id: "2021/zh-cn/user-guide/rocketmq/advanced-guide.md";
  slug: "2021/zh-cn/user-guide/rocketmq/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/user-guide/rocketmq/overview.md": {
	id: "2021/zh-cn/user-guide/rocketmq/overview.md";
  slug: "2021/zh-cn/user-guide/rocketmq/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/user-guide/rocketmq/quick-start.md": {
	id: "2021/zh-cn/user-guide/rocketmq/quick-start.md";
  slug: "2021/zh-cn/user-guide/rocketmq/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/user-guide/seata/advanced-guide.md": {
	id: "2021/zh-cn/user-guide/seata/advanced-guide.md";
  slug: "2021/zh-cn/user-guide/seata/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/user-guide/seata/overview.md": {
	id: "2021/zh-cn/user-guide/seata/overview.md";
  slug: "2021/zh-cn/user-guide/seata/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/user-guide/seata/quick-start.md": {
	id: "2021/zh-cn/user-guide/seata/quick-start.md";
  slug: "2021/zh-cn/user-guide/seata/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/user-guide/sentinel/advanced-guide.md": {
	id: "2021/zh-cn/user-guide/sentinel/advanced-guide.md";
  slug: "2021/zh-cn/user-guide/sentinel/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/user-guide/sentinel/overview.md": {
	id: "2021/zh-cn/user-guide/sentinel/overview.md";
  slug: "2021/zh-cn/user-guide/sentinel/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/user-guide/sentinel/quick-start.md": {
	id: "2021/zh-cn/user-guide/sentinel/quick-start.md";
  slug: "2021/zh-cn/user-guide/sentinel/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/user-guide/sidecar/advanced-guide.md": {
	id: "2021/zh-cn/user-guide/sidecar/advanced-guide.md";
  slug: "2021/zh-cn/user-guide/sidecar/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/user-guide/sidecar/overview.md": {
	id: "2021/zh-cn/user-guide/sidecar/overview.md";
  slug: "2021/zh-cn/user-guide/sidecar/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2021/zh-cn/user-guide/sidecar/quick-start.md": {
	id: "2021/zh-cn/user-guide/sidecar/quick-start.md";
  slug: "2021/zh-cn/user-guide/sidecar/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/best-practice/integrated-example.md": {
	id: "2022/en/best-practice/integrated-example.md";
  slug: "2022/en/best-practice/integrated-example";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/best-practice/spring-boot-to-spring-cloud.md": {
	id: "2022/en/best-practice/spring-boot-to-spring-cloud.md";
  slug: "2022/en/best-practice/spring-boot-to-spring-cloud";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/overview/faq.md": {
	id: "2022/en/overview/faq.md";
  slug: "2022/en/overview/faq";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/overview/version-explain.md": {
	id: "2022/en/overview/version-explain.md";
  slug: "2022/en/overview/version-explain";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/overview/what-is-sca.md": {
	id: "2022/en/overview/what-is-sca.md";
  slug: "2022/en/overview/what-is-sca";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/user-guide/graalvm/overview.md": {
	id: "2022/en/user-guide/graalvm/overview.md";
  slug: "2022/en/user-guide/graalvm/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/user-guide/graalvm/quick-start.md": {
	id: "2022/en/user-guide/graalvm/quick-start.md";
  slug: "2022/en/user-guide/graalvm/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/user-guide/nacos/advanced-guide.md": {
	id: "2022/en/user-guide/nacos/advanced-guide.md";
  slug: "2022/en/user-guide/nacos/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/user-guide/nacos/overview.md": {
	id: "2022/en/user-guide/nacos/overview.md";
  slug: "2022/en/user-guide/nacos/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/user-guide/nacos/quick-start.md": {
	id: "2022/en/user-guide/nacos/quick-start.md";
  slug: "2022/en/user-guide/nacos/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/user-guide/rocketmq/advanced-guide.md": {
	id: "2022/en/user-guide/rocketmq/advanced-guide.md";
  slug: "2022/en/user-guide/rocketmq/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/user-guide/rocketmq/overview.md": {
	id: "2022/en/user-guide/rocketmq/overview.md";
  slug: "2022/en/user-guide/rocketmq/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/user-guide/rocketmq/quick-start.md": {
	id: "2022/en/user-guide/rocketmq/quick-start.md";
  slug: "2022/en/user-guide/rocketmq/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/user-guide/seata/advanced-guide.md": {
	id: "2022/en/user-guide/seata/advanced-guide.md";
  slug: "2022/en/user-guide/seata/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/user-guide/seata/overview.md": {
	id: "2022/en/user-guide/seata/overview.md";
  slug: "2022/en/user-guide/seata/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/user-guide/seata/quick-start.md": {
	id: "2022/en/user-guide/seata/quick-start.md";
  slug: "2022/en/user-guide/seata/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/user-guide/sentinel/advanced-guide.md": {
	id: "2022/en/user-guide/sentinel/advanced-guide.md";
  slug: "2022/en/user-guide/sentinel/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/user-guide/sentinel/overview.md": {
	id: "2022/en/user-guide/sentinel/overview.md";
  slug: "2022/en/user-guide/sentinel/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/user-guide/sentinel/quick-start.md": {
	id: "2022/en/user-guide/sentinel/quick-start.md";
  slug: "2022/en/user-guide/sentinel/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/user-guide/sidecar/advanced-guide.md": {
	id: "2022/en/user-guide/sidecar/advanced-guide.md";
  slug: "2022/en/user-guide/sidecar/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/user-guide/sidecar/overview.md": {
	id: "2022/en/user-guide/sidecar/overview.md";
  slug: "2022/en/user-guide/sidecar/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/en/user-guide/sidecar/quick-start.md": {
	id: "2022/en/user-guide/sidecar/quick-start.md";
  slug: "2022/en/user-guide/sidecar/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/best-practice/integrated-example.md": {
	id: "2022/zh-cn/best-practice/integrated-example.md";
  slug: "2022/zh-cn/best-practice/integrated-example";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/best-practice/spring-boot-to-spring-cloud.md": {
	id: "2022/zh-cn/best-practice/spring-boot-to-spring-cloud.md";
  slug: "2022/zh-cn/best-practice/spring-boot-to-spring-cloud";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/overview/faq.md": {
	id: "2022/zh-cn/overview/faq.md";
  slug: "2022/zh-cn/overview/faq";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/overview/version-explain.md": {
	id: "2022/zh-cn/overview/version-explain.md";
  slug: "2022/zh-cn/overview/version-explain";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/overview/what-is-sca.md": {
	id: "2022/zh-cn/overview/what-is-sca.md";
  slug: "2022/zh-cn/overview/what-is-sca";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/user-guide/graalvm/overview.md": {
	id: "2022/zh-cn/user-guide/graalvm/overview.md";
  slug: "2022/zh-cn/user-guide/graalvm/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/user-guide/graalvm/quick-start.md": {
	id: "2022/zh-cn/user-guide/graalvm/quick-start.md";
  slug: "2022/zh-cn/user-guide/graalvm/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/user-guide/nacos/advanced-guide.md": {
	id: "2022/zh-cn/user-guide/nacos/advanced-guide.md";
  slug: "2022/zh-cn/user-guide/nacos/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/user-guide/nacos/overview.md": {
	id: "2022/zh-cn/user-guide/nacos/overview.md";
  slug: "2022/zh-cn/user-guide/nacos/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/user-guide/nacos/quick-start.md": {
	id: "2022/zh-cn/user-guide/nacos/quick-start.md";
  slug: "2022/zh-cn/user-guide/nacos/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/user-guide/rocketmq/advanced-guide.md": {
	id: "2022/zh-cn/user-guide/rocketmq/advanced-guide.md";
  slug: "2022/zh-cn/user-guide/rocketmq/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/user-guide/rocketmq/overview.md": {
	id: "2022/zh-cn/user-guide/rocketmq/overview.md";
  slug: "2022/zh-cn/user-guide/rocketmq/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/user-guide/rocketmq/quick-start.md": {
	id: "2022/zh-cn/user-guide/rocketmq/quick-start.md";
  slug: "2022/zh-cn/user-guide/rocketmq/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/user-guide/seata/advanced-guide.md": {
	id: "2022/zh-cn/user-guide/seata/advanced-guide.md";
  slug: "2022/zh-cn/user-guide/seata/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/user-guide/seata/overview.md": {
	id: "2022/zh-cn/user-guide/seata/overview.md";
  slug: "2022/zh-cn/user-guide/seata/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/user-guide/seata/quick-start.md": {
	id: "2022/zh-cn/user-guide/seata/quick-start.md";
  slug: "2022/zh-cn/user-guide/seata/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/user-guide/sentinel/advanced-guide.md": {
	id: "2022/zh-cn/user-guide/sentinel/advanced-guide.md";
  slug: "2022/zh-cn/user-guide/sentinel/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/user-guide/sentinel/overview.md": {
	id: "2022/zh-cn/user-guide/sentinel/overview.md";
  slug: "2022/zh-cn/user-guide/sentinel/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/user-guide/sentinel/quick-start.md": {
	id: "2022/zh-cn/user-guide/sentinel/quick-start.md";
  slug: "2022/zh-cn/user-guide/sentinel/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/user-guide/sidecar/advanced-guide.md": {
	id: "2022/zh-cn/user-guide/sidecar/advanced-guide.md";
  slug: "2022/zh-cn/user-guide/sidecar/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/user-guide/sidecar/overview.md": {
	id: "2022/zh-cn/user-guide/sidecar/overview.md";
  slug: "2022/zh-cn/user-guide/sidecar/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2022/zh-cn/user-guide/sidecar/quick-start.md": {
	id: "2022/zh-cn/user-guide/sidecar/quick-start.md";
  slug: "2022/zh-cn/user-guide/sidecar/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/best-practice/integrated-example.md": {
	id: "2023/en/best-practice/integrated-example.md";
  slug: "2023/en/best-practice/integrated-example";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/best-practice/spring-boot-to-spring-cloud.md": {
	id: "2023/en/best-practice/spring-boot-to-spring-cloud.md";
  slug: "2023/en/best-practice/spring-boot-to-spring-cloud";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/overview/faq.md": {
	id: "2023/en/overview/faq.md";
  slug: "2023/en/overview/faq";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/overview/roadmap/doc/doc.md": {
	id: "2023/en/overview/roadmap/doc/doc.md";
  slug: "2023/en/overview/roadmap/doc/doc";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/overview/roadmap/graalvm-adapter/graalvm.md": {
	id: "2023/en/overview/roadmap/graalvm-adapter/graalvm.md";
  slug: "2023/en/overview/roadmap/graalvm-adapter/graalvm";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/overview/version-explain.md": {
	id: "2023/en/overview/version-explain.md";
  slug: "2023/en/overview/version-explain";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/overview/what-is-sca.md": {
	id: "2023/en/overview/what-is-sca.md";
  slug: "2023/en/overview/what-is-sca";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/user-guide/graalvm/overview.md": {
	id: "2023/en/user-guide/graalvm/overview.md";
  slug: "2023/en/user-guide/graalvm/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/user-guide/graalvm/quick-start.md": {
	id: "2023/en/user-guide/graalvm/quick-start.md";
  slug: "2023/en/user-guide/graalvm/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/user-guide/nacos/advanced-guide.md": {
	id: "2023/en/user-guide/nacos/advanced-guide.md";
  slug: "2023/en/user-guide/nacos/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/user-guide/nacos/overview.md": {
	id: "2023/en/user-guide/nacos/overview.md";
  slug: "2023/en/user-guide/nacos/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/user-guide/nacos/quick-start.md": {
	id: "2023/en/user-guide/nacos/quick-start.md";
  slug: "2023/en/user-guide/nacos/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/user-guide/rocketmq/advanced-guide.md": {
	id: "2023/en/user-guide/rocketmq/advanced-guide.md";
  slug: "2023/en/user-guide/rocketmq/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/user-guide/rocketmq/overview.md": {
	id: "2023/en/user-guide/rocketmq/overview.md";
  slug: "2023/en/user-guide/rocketmq/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/user-guide/rocketmq/quick-start.md": {
	id: "2023/en/user-guide/rocketmq/quick-start.md";
  slug: "2023/en/user-guide/rocketmq/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/user-guide/seata/advanced-guide.md": {
	id: "2023/en/user-guide/seata/advanced-guide.md";
  slug: "2023/en/user-guide/seata/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/user-guide/seata/overview.md": {
	id: "2023/en/user-guide/seata/overview.md";
  slug: "2023/en/user-guide/seata/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/user-guide/seata/quick-start.md": {
	id: "2023/en/user-guide/seata/quick-start.md";
  slug: "2023/en/user-guide/seata/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/user-guide/sentinel/advanced-guide.md": {
	id: "2023/en/user-guide/sentinel/advanced-guide.md";
  slug: "2023/en/user-guide/sentinel/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/user-guide/sentinel/overview.md": {
	id: "2023/en/user-guide/sentinel/overview.md";
  slug: "2023/en/user-guide/sentinel/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/user-guide/sentinel/quick-start.md": {
	id: "2023/en/user-guide/sentinel/quick-start.md";
  slug: "2023/en/user-guide/sentinel/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/user-guide/sidecar/advanced-guide.md": {
	id: "2023/en/user-guide/sidecar/advanced-guide.md";
  slug: "2023/en/user-guide/sidecar/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/user-guide/sidecar/overview.md": {
	id: "2023/en/user-guide/sidecar/overview.md";
  slug: "2023/en/user-guide/sidecar/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/en/user-guide/sidecar/quick-start.md": {
	id: "2023/en/user-guide/sidecar/quick-start.md";
  slug: "2023/en/user-guide/sidecar/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/best-practice/integrated-example.md": {
	id: "2023/zh-cn/best-practice/integrated-example.md";
  slug: "2023/zh-cn/best-practice/integrated-example";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/best-practice/spring-boot-to-spring-cloud.md": {
	id: "2023/zh-cn/best-practice/spring-boot-to-spring-cloud.md";
  slug: "2023/zh-cn/best-practice/spring-boot-to-spring-cloud";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/overview/faq.md": {
	id: "2023/zh-cn/overview/faq.md";
  slug: "2023/zh-cn/overview/faq";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/overview/roadmap/doc/doc.md": {
	id: "2023/zh-cn/overview/roadmap/doc/doc.md";
  slug: "2023/zh-cn/overview/roadmap/doc/doc";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/overview/roadmap/graalvm-adapter/graalvm.md": {
	id: "2023/zh-cn/overview/roadmap/graalvm-adapter/graalvm.md";
  slug: "2023/zh-cn/overview/roadmap/graalvm-adapter/graalvm";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/overview/version-explain.md": {
	id: "2023/zh-cn/overview/version-explain.md";
  slug: "2023/zh-cn/overview/version-explain";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/overview/what-is-sca.md": {
	id: "2023/zh-cn/overview/what-is-sca.md";
  slug: "2023/zh-cn/overview/what-is-sca";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/ai/overview.md": {
	id: "2023/zh-cn/user-guide/ai/overview.md";
  slug: "2023/zh-cn/user-guide/ai/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/ai/quick-start.md": {
	id: "2023/zh-cn/user-guide/ai/quick-start.md";
  slug: "2023/zh-cn/user-guide/ai/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/graalvm/advanced-guide.md": {
	id: "2023/zh-cn/user-guide/graalvm/advanced-guide.md";
  slug: "2023/zh-cn/user-guide/graalvm/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/graalvm/overview.md": {
	id: "2023/zh-cn/user-guide/graalvm/overview.md";
  slug: "2023/zh-cn/user-guide/graalvm/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/graalvm/quick-start.md": {
	id: "2023/zh-cn/user-guide/graalvm/quick-start.md";
  slug: "2023/zh-cn/user-guide/graalvm/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/nacos/advanced-guide.md": {
	id: "2023/zh-cn/user-guide/nacos/advanced-guide.md";
  slug: "2023/zh-cn/user-guide/nacos/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/nacos/overview.md": {
	id: "2023/zh-cn/user-guide/nacos/overview.md";
  slug: "2023/zh-cn/user-guide/nacos/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/nacos/quick-start.md": {
	id: "2023/zh-cn/user-guide/nacos/quick-start.md";
  slug: "2023/zh-cn/user-guide/nacos/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/rocketmq/advanced-guide.md": {
	id: "2023/zh-cn/user-guide/rocketmq/advanced-guide.md";
  slug: "2023/zh-cn/user-guide/rocketmq/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/rocketmq/overview.md": {
	id: "2023/zh-cn/user-guide/rocketmq/overview.md";
  slug: "2023/zh-cn/user-guide/rocketmq/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/rocketmq/quick-start.md": {
	id: "2023/zh-cn/user-guide/rocketmq/quick-start.md";
  slug: "2023/zh-cn/user-guide/rocketmq/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/seata/advanced-guide.md": {
	id: "2023/zh-cn/user-guide/seata/advanced-guide.md";
  slug: "2023/zh-cn/user-guide/seata/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/seata/overview.md": {
	id: "2023/zh-cn/user-guide/seata/overview.md";
  slug: "2023/zh-cn/user-guide/seata/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/seata/quick-start.md": {
	id: "2023/zh-cn/user-guide/seata/quick-start.md";
  slug: "2023/zh-cn/user-guide/seata/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/sentinel/advanced-guide.md": {
	id: "2023/zh-cn/user-guide/sentinel/advanced-guide.md";
  slug: "2023/zh-cn/user-guide/sentinel/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/sentinel/overview.md": {
	id: "2023/zh-cn/user-guide/sentinel/overview.md";
  slug: "2023/zh-cn/user-guide/sentinel/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/sentinel/quick-start.md": {
	id: "2023/zh-cn/user-guide/sentinel/quick-start.md";
  slug: "2023/zh-cn/user-guide/sentinel/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/sidecar/advanced-guide.md": {
	id: "2023/zh-cn/user-guide/sidecar/advanced-guide.md";
  slug: "2023/zh-cn/user-guide/sidecar/advanced-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/sidecar/overview.md": {
	id: "2023/zh-cn/user-guide/sidecar/overview.md";
  slug: "2023/zh-cn/user-guide/sidecar/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"2023/zh-cn/user-guide/sidecar/quick-start.md": {
	id: "2023/zh-cn/user-guide/sidecar/quick-start.md";
  slug: "2023/zh-cn/user-guide/sidecar/quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"developer/en/contributor-guide/file-write-guide_dev.md": {
	id: "developer/en/contributor-guide/file-write-guide_dev.md";
  slug: "developer/en/contributor-guide/file-write-guide_dev";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"developer/en/contributor-guide/new-contributor-guide_dev.md": {
	id: "developer/en/contributor-guide/new-contributor-guide_dev.md";
  slug: "developer/en/contributor-guide/new-contributor-guide_dev";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"developer/en/contributor-guide/reporting-security-issues_dev.md": {
	id: "developer/en/contributor-guide/reporting-security-issues_dev.md";
  slug: "developer/en/contributor-guide/reporting-security-issues_dev";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"developer/en/developers_dev.md": {
	id: "developer/en/developers_dev.md";
  slug: "developer/en/developers_dev";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"developer/zh-cn/contributor-guide/file-write-guide_dev.md": {
	id: "developer/zh-cn/contributor-guide/file-write-guide_dev.md";
  slug: "developer/zh-cn/contributor-guide/file-write-guide_dev";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"developer/zh-cn/contributor-guide/new-contributor-guide_dev.md": {
	id: "developer/zh-cn/contributor-guide/new-contributor-guide_dev.md";
  slug: "developer/zh-cn/contributor-guide/new-contributor-guide_dev";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"developer/zh-cn/contributor-guide/reporting-security-issues_dev.md": {
	id: "developer/zh-cn/contributor-guide/reporting-security-issues_dev.md";
  slug: "developer/zh-cn/contributor-guide/reporting-security-issues_dev";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"developer/zh-cn/developers_dev.md": {
	id: "developer/zh-cn/developers_dev.md";
  slug: "developer/zh-cn/developers_dev";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ebook/zh-cn/aaqbnx.mdx": {
	id: "ebook/zh-cn/aaqbnx.mdx";
  slug: "ebook/zh-cn/aaqbnx";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/akq64a.mdx": {
	id: "ebook/zh-cn/akq64a.mdx";
  slug: "ebook/zh-cn/akq64a";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/akszh2.mdx": {
	id: "ebook/zh-cn/akszh2.mdx";
  slug: "ebook/zh-cn/akszh2";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/assenf.mdx": {
	id: "ebook/zh-cn/assenf.mdx";
  slug: "ebook/zh-cn/assenf";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/bgmd8i.mdx": {
	id: "ebook/zh-cn/bgmd8i.mdx";
  slug: "ebook/zh-cn/bgmd8i";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/cdkqhk.mdx": {
	id: "ebook/zh-cn/cdkqhk.mdx";
  slug: "ebook/zh-cn/cdkqhk";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/ck6xf6.mdx": {
	id: "ebook/zh-cn/ck6xf6.mdx";
  slug: "ebook/zh-cn/ck6xf6";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/dtdnyy.mdx": {
	id: "ebook/zh-cn/dtdnyy.mdx";
  slug: "ebook/zh-cn/dtdnyy";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/euq2fi.mdx": {
	id: "ebook/zh-cn/euq2fi.mdx";
  slug: "ebook/zh-cn/euq2fi";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/fsdbgy.mdx": {
	id: "ebook/zh-cn/fsdbgy.mdx";
  slug: "ebook/zh-cn/fsdbgy";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/gamvyg.mdx": {
	id: "ebook/zh-cn/gamvyg.mdx";
  slug: "ebook/zh-cn/gamvyg";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/gbup3a.mdx": {
	id: "ebook/zh-cn/gbup3a.mdx";
  slug: "ebook/zh-cn/gbup3a";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/gg3fvw.mdx": {
	id: "ebook/zh-cn/gg3fvw.mdx";
  slug: "ebook/zh-cn/gg3fvw";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/ggmmft.mdx": {
	id: "ebook/zh-cn/ggmmft.mdx";
  slug: "ebook/zh-cn/ggmmft";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/hkgsqu.mdx": {
	id: "ebook/zh-cn/hkgsqu.mdx";
  slug: "ebook/zh-cn/hkgsqu";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/hvraft.mdx": {
	id: "ebook/zh-cn/hvraft.mdx";
  slug: "ebook/zh-cn/hvraft";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/hzzzd9.mdx": {
	id: "ebook/zh-cn/hzzzd9.mdx";
  slug: "ebook/zh-cn/hzzzd9";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/ipeble.mdx": {
	id: "ebook/zh-cn/ipeble.mdx";
  slug: "ebook/zh-cn/ipeble";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/khzqeg.mdx": {
	id: "ebook/zh-cn/khzqeg.mdx";
  slug: "ebook/zh-cn/khzqeg";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/me0tbz.mdx": {
	id: "ebook/zh-cn/me0tbz.mdx";
  slug: "ebook/zh-cn/me0tbz";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/muynvi.mdx": {
	id: "ebook/zh-cn/muynvi.mdx";
  slug: "ebook/zh-cn/muynvi";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/ngxm99.mdx": {
	id: "ebook/zh-cn/ngxm99.mdx";
  slug: "ebook/zh-cn/ngxm99";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/ogtees.mdx": {
	id: "ebook/zh-cn/ogtees.mdx";
  slug: "ebook/zh-cn/ogtees";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/on0vzt.mdx": {
	id: "ebook/zh-cn/on0vzt.mdx";
  slug: "ebook/zh-cn/on0vzt";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/pd0f3u.mdx": {
	id: "ebook/zh-cn/pd0f3u.mdx";
  slug: "ebook/zh-cn/pd0f3u";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/pf6ee1.mdx": {
	id: "ebook/zh-cn/pf6ee1.mdx";
  slug: "ebook/zh-cn/pf6ee1";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/pz5pqr.mdx": {
	id: "ebook/zh-cn/pz5pqr.mdx";
  slug: "ebook/zh-cn/pz5pqr";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/rv9pn1.mdx": {
	id: "ebook/zh-cn/rv9pn1.mdx";
  slug: "ebook/zh-cn/rv9pn1";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/snoxot.mdx": {
	id: "ebook/zh-cn/snoxot.mdx";
  slug: "ebook/zh-cn/snoxot";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/somsth.mdx": {
	id: "ebook/zh-cn/somsth.mdx";
  slug: "ebook/zh-cn/somsth";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/srekog.mdx": {
	id: "ebook/zh-cn/srekog.mdx";
  slug: "ebook/zh-cn/srekog";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/su8w58.mdx": {
	id: "ebook/zh-cn/su8w58.mdx";
  slug: "ebook/zh-cn/su8w58";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/svayai.mdx": {
	id: "ebook/zh-cn/svayai.mdx";
  slug: "ebook/zh-cn/svayai";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/tdbw3b.mdx": {
	id: "ebook/zh-cn/tdbw3b.mdx";
  slug: "ebook/zh-cn/tdbw3b";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/tnxg5t.mdx": {
	id: "ebook/zh-cn/tnxg5t.mdx";
  slug: "ebook/zh-cn/tnxg5t";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/uimxlk.mdx": {
	id: "ebook/zh-cn/uimxlk.mdx";
  slug: "ebook/zh-cn/uimxlk";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/utfh8i.mdx": {
	id: "ebook/zh-cn/utfh8i.mdx";
  slug: "ebook/zh-cn/utfh8i";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/vn6lg3.mdx": {
	id: "ebook/zh-cn/vn6lg3.mdx";
  slug: "ebook/zh-cn/vn6lg3";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/wct036.mdx": {
	id: "ebook/zh-cn/wct036.mdx";
  slug: "ebook/zh-cn/wct036";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/wh1hoh.mdx": {
	id: "ebook/zh-cn/wh1hoh.mdx";
  slug: "ebook/zh-cn/wh1hoh";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/wh4qgy.mdx": {
	id: "ebook/zh-cn/wh4qgy.mdx";
  slug: "ebook/zh-cn/wh4qgy";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ebook/zh-cn/xqk29p.mdx": {
	id: "ebook/zh-cn/xqk29p.mdx";
  slug: "ebook/zh-cn/xqk29p";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
};
"download": {
};

	};

	type DataEntryMap = {
		"i18n": {
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
