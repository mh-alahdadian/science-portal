import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface paginationProps {
    current: number;
    itemsCount: number;
    perPage?: number;
    handleClick: any;
}

export default function Pagination(props: paginationProps) {
    const pagesCount = Math.ceil(props.itemsCount / (props.perPage || 8))

    return (
        <div className="flex justify-center items-center gap-2 mx-auto">
            {/* right arrow */}
            <button onClick={() => props.handleClick((prev: number) => prev - 1)} className={`${props.current === 1 ? "pointer-events-none cursor-default opacity-40" : ""} flex justify-center items-center w-10 h-10 hover:bg-gray-200`}>
                <CaretRight />
            </button>

            {/* first page */}
            {(props.current >= 4) &&
                <button onClick={() => props.handleClick(1)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                    1
                </button>
            }

            {/* 3 dots between current and first page */}
            {(props.current >= 5) &&
                <div className="flex justify-center items-center w-10 h-10">
                    ...
                </div>
            }

            {/* page number items */}
            {/* if it was on first page */}
            {(props.current === 1) &&
                <div className="flex gap-2">
                    <button className="flex justify-center items-center w-10 h-10 border hover:bg-gray-200">
                        1
                    </button>

                    {pagesCount >= 2 &&
                        <button onClick={() => props.handleClick(2)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                            2
                        </button>
                    }

                    {pagesCount >= 3 &&
                        <button onClick={() => props.handleClick(3)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                            3
                        </button>
                    }
                </div>
            }

            {/* if it was on second page */}
            {(props.current === 2) &&
                <div className="flex gap-2">
                    <button onClick={() => props.handleClick(1)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                        1
                    </button>

                    <button className="flex justify-center items-center w-10 h-10 border hover:bg-gray-200">
                        2
                    </button>

                    {pagesCount >= 3 &&
                        <button onClick={() => props.handleClick(3)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                            3
                        </button>
                    }

                    {pagesCount >= 4 &&
                        <button onClick={() => props.handleClick(4)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                            4
                        </button>
                    }
                </div>
            }

            {/* if it was on third page */}
            {(props.current === 3) &&
                <div className="flex gap-2">
                    <button onClick={() => props.handleClick(1)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                        1
                    </button>

                    <button onClick={() => props.handleClick(2)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                        2
                    </button>

                    <button className="flex justify-center items-center w-10 h-10 border hover:bg-gray-200">
                        3
                    </button>

                    {pagesCount >= 4 &&
                        <button onClick={() => props.handleClick(4)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                            4
                        </button>
                    }

                    {pagesCount >= 5 &&
                        <button onClick={() => props.handleClick(5)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                            5
                        </button>
                    }
                </div>
            }

            {/* if it was on some middle pages */}
            {(props.current > 3 && props.current < pagesCount - 2) &&
                <div className="flex gap-2">
                    <button onClick={() => props.handleClick(props.current - 2)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                        {props.current - 2}
                    </button>

                    <button onClick={() => props.handleClick(props.current - 1)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                        {props.current - 1}
                    </button>

                    <button className="flex justify-center items-center w-10 h-10 border hover:bg-gray-200">
                        {props.current}
                    </button>

                    <button onClick={() => props.handleClick(props.current + 1)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                        {props.current + 1}
                    </button>

                    <button onClick={() => props.handleClick(props.current + 2)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                        {props.current + 2}
                    </button>
                </div>
            }

            {/* if it was on last page */}
            {(props.current === pagesCount) &&
                <div className="flex gap-2">
                    {(props.current - 2 > 0) &&
                        <button onClick={() => props.handleClick(props.current - 2)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                            {props.current - 2}
                        </button>
                    }

                    {(props.current - 1 > 0) &&
                        <button onClick={() => props.handleClick(props.current - 1)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                            {props.current - 1}
                        </button>
                    }

                    <button className="flex justify-center items-center w-10 h-10 border hover:bg-gray-200">
                        {props.current}
                    </button>
                </div>
            }

            {/* if it was on second last page */}
            {(props.current === pagesCount - 1) &&
                <div className="flex gap-2">
                    {(props.current - 2 > 0) &&
                        <button onClick={() => props.handleClick(props.current - 2)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                            {props.current - 2}
                        </button>
                    }

                    {(props.current - 1 > 0) &&
                        <button onClick={() => props.handleClick(props.current - 1)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                            {props.current - 1}
                        </button>
                    }

                    <button className="flex justify-center items-center w-10 h-10 border hover:bg-gray-200">
                        {props.current}
                    </button>

                    <button onClick={() => props.handleClick(pagesCount)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                        {pagesCount}
                    </button>
                </div>
            }

            {/* if it was on third last page */}
            {(props.current === pagesCount - 2) &&
                <div className="flex gap-2">
                    {(props.current - 2 > 0) &&
                        <button onClick={() => props.handleClick(props.current - 2)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                            {props.current - 2}
                        </button>
                    }

                    {(props.current - 1 > 0) &&
                        <button onClick={() => props.handleClick(props.current - 1)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                            {props.current - 1}
                        </button>
                    }

                    <button className="flex justify-center items-center w-10 h-10 border hover:bg-gray-200">
                        {props.current}
                    </button>

                    <button onClick={() => props.handleClick(props.current + 1)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                        {props.current + 1}
                    </button>

                    <button onClick={() => props.handleClick(props.current + 2)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                        {props.current + 2}
                    </button>
                </div>
            }

            {/* 3 dots between current and last page */}
            {(props.current < pagesCount - 3) &&
                <div className="flex justify-center items-center w-10 h-10">
                    ...
                </div>
            }

            {/* last page */}
            {(props.current < pagesCount - 2) &&
                <button onClick={() => props.handleClick(pagesCount)} className="flex justify-center items-center w-10 h-10 hover:bg-gray-200">
                    {pagesCount}
                </button>
            }

            {/* left arrow */}
            <button onClick={() => props.handleClick((prev: number) => prev + 1)} className={`${props.current === pagesCount ? "pointer-events-none cursor-default opacity-40" : ""} flex justify-center items-center w-10 h-10 hover:bg-gray-200`}>
                <CaretLeft />
            </button>

        </div>
    )

}