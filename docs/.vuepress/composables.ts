import {useBreakpoint, useMemo} from "vooks"
import {h, inject, InjectionKey} from "vue"
import {usePagesData} from "@vuepress/client"
import type {PageData} from "../types"
import {NIcon, MenuDividerOption, MenuGroupOption, MenuOption} from "naive-ui";
import {RouterLink} from "vue-router";
import {Folder, File} from '@vicons/tabler'

export const pagesSymbol: InjectionKey<Promise<PageData[]>> = Symbol("posts")

export const getMenus = async () => {
    const menus: (MenuOption)[] = []
    const pages = await resolvePages()
    for (const page of pages) {
        if (page.path === '/404.html')
            continue

        const path = decodeURI(page.path)
        let context = menus
        let currentRoute = ''
        path.split('/').forEach((seg, i, array) => {
            if (seg === '')
                return
            currentRoute += '/' + seg
            if (i === array.length - 1) {
                context.push({
                    label: () => h(
                        RouterLink,
                        // 文档这里写的类型有问题，我找了半天才定位到这里，丢人文档
                        {to: path},
                        {default: () => page.frontmatter.title}
                    ),
                    key: currentRoute,
                    icon: () => h(NIcon, null, {default: () => h(File)})
                })
            } else {
                const temp = context.find(m => m.hasOwnProperty('label') && m.label === seg)
                if (temp !== undefined) {
                    context = (temp.children as (MenuOption | MenuDividerOption | MenuGroupOption)[])
                } else {
                    const group = {
                        label: seg,
                        key: currentRoute,
                        icon: () => h(NIcon, null, {default: () => h(Folder)}),
                        children: [] as (MenuOption | MenuDividerOption | MenuGroupOption)[]
                    }
                    context.push(group)
                    context = group.children
                }
            }
        })
    }
    return menus
}

/**
 * https://github.com/vuepress/vuepress-next/discussions/72
 * Inject pages global computed
 */
export const usePages = async (): Promise<PageData[]> => {
    const pages = inject(pagesSymbol)
    if (!pages)
        throw new Error("usePages() is called without provider.")
    return pages
}

const resolvePages = () => {
    const pagesData = usePagesData()

    return Promise.all(
        Object.keys(pagesData.value).map((key) => pagesData.value[key]())
    )
}

export function useIsMobile() {
    const breakpointRef = useBreakpoint()
    return useMemo(() => {
        return breakpointRef.value === 'xs'
    })
}


