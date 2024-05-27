const Button = (props) =>{
    const {
        href,
        theme = "normal",
        size = "medium",
        visibility = true,
        target = "_self",
        children,
    } = props;

    return (
        <a
            href={href}
            target={target}
            class={`
                group
                btn transition-shadow ease-in-out duration-200
                flex items-center justify-center text-sm rounded-3xl no-underline 
                button-${theme || 'normal'} 
                bg-${theme || 'normal'} 
                link-button-bg-${theme}
                ${size === 'small' ? 'xp-small h-small' : ''} 
                ${size === 'medium' ? 'xp-medium h-medium' : ''} 
                ${size === 'large' ? 'xp-large h-large' : ''} 
                ${props?.class || ''}
            `}
        >
        {children}
        {
            visibility && (
            <span class="icon group-hover:ml-2 group-hover:opacity-100 group-hover:w-[8px] group-hover:translate-x-[3px] opacity-0 w-0 duration-200 ease-in-out">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    version="1.1"
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                >
                    <g transform="matrix(-1,0,0,1,16,0)">
                        <path
                            fill={theme === "normal" ? "#1E1F24" : "#A3A6B3"}
                            fill-opacity="1"
                            d="M9.27237,2.16302L9.27237,6.99801Q9.27237,7.26839,9.08915,7.45161Q8.905925,7.63483,8.636183,7.6342Q8.365805,7.6342,8.183221,7.45097Q8.000636137,7.26775,8,6.99801L8,0.636183Q8,0.365805,8.183221,0.183221Q8.366441,0.000636364,8.636183,0L14.99801,0Q15.26839,0,15.451609999999999,0.183221Q15.634830000000001,0.366441,15.63419,0.636183Q15.63419,0.906561,15.45097,1.08978Q15.26775,1.273,14.99801,1.27237L10.16302,1.27237L15.825050000000001,6.93439Q16,7.10935,16,7.37972Q16,7.6501,15.825050000000001,7.82505Q15.6501,8,15.379719999999999,8Q15.10935,8,14.93439,7.82505L9.27237,2.16302Z"
                        />
                    </g>
                </svg>
            </span>
            )
        }
        </a>
    );
};

export default Button;