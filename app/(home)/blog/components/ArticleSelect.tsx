import React from "react"
import Link from "next/link"

interface Category {
    id: number
    attributes: {
        name: string
        slug: string
        articles: {
            data: Array<{}>
        }
    }
}

interface Article {
    id: number
    attributes: {
        title: string
        slug: string
    }
}

function selectedFilter(current: string, selected: string) {
    return current === selected
        ? "px-3 py-1 rounded-lg hover:underline"
        : "px-3 py-1 rounded-lg hover:underline"
}

export default function ArticleSelect({
    categories,
    articles,
    params
}: {
    categories: Category[]
    articles: Article[]
    params: {
        slug: string
        category: string
    }
}) {
    return (
        <div className="relative min-h-[365px] rounded-lg p-4">
            <h4 className="text-xl font-semibold">Browse By Category</h4>

            <div>
                <div className="flex flex-wrap space-x-2 py-6">
                    {categories.map((category: Category) => {
                        if (category.attributes.articles.data.length === 0)
                            return null
                        return (
                            <Link
                                prefetch={false}
                                key={category.id}
                                href={`/blog/${category.attributes.slug}`}
                                className={selectedFilter(
                                    category.attributes.slug,
                                    params.category
                                )}
                            >
                                #{category.attributes.name}
                            </Link>
                        )
                    })}
                    <Link
                        prefetch={false}
                        href={"/"}
                        className={selectedFilter("", "filter")}
                    >
                        #all
                    </Link>
                </div>

                <div className="space-y-2">
                    <h4 className="text-lg font-semibold">
                        Other Posts You May Like
                    </h4>
                    <ul className="ml-4 list-disc space-y-1">
                        {articles.map((article: Article) => {
                            return (
                                <li key={article.id}>
                                    <Link
                                        prefetch={false}
                                        rel="noopener noreferrer"
                                        href={`/blog/${params.category}/${article.attributes.slug}`}
                                        className={`${
                                            params.slug ===
                                                article.attributes.slug &&
                                            "text-violet-400"
                                        }  transition-colors duration-200 hover:text-violet-400 hover:underline`}
                                    >
                                        {article.attributes.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
