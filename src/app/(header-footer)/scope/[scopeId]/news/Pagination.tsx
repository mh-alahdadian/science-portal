import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface paginationProps {
    current: number;
    itemsCount: number;
    perPage?: number;
    handleClick: any;
}

export default function Pagination(props: paginationProps) {
    const pagesCount = Math.ceil(props.itemsCount / (props.perPage ? props.perPage : 8))

    return (
        <div className="flex justify-center items-center gap-2 mx-auto">
            {/* right arrow */}
            {(props.current > 1) &&
                <div onClick={()=> props.handleClick((prev: number)=> prev -1)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                    <CaretRight />
                </div>
            }

            {/* first page */}
            {(props.current >= 4) &&
                <div onClick={()=> props.handleClick(1)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                    1
                </div>
            }

            {/* 3 dots between current and first page */}
            {(props.current >= 5) &&
                <div className="flex justify-center items-center w-[40px] h-[40px]">
                    ...
                </div>
            }

            {/* page number items */}
            {/* if it was on first page */}
            {(props.current === 1) &&
                <div className="flex gap-2">
                    <div className="flex justify-center items-center w-[40px] h-[40px] border hover:bg-gray-200">
                        1
                    </div>

                    {pagesCount >= 2 &&
                        <div onClick={()=> props.handleClick(2)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                            2
                        </div>
                    }

                    {pagesCount >= 3 &&
                        <div onClick={()=> props.handleClick(3)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                            3
                        </div>
                    }
                </div>
            }

            {/* if it was on second page */}
            {(props.current === 2) &&
                <div className="flex gap-2">
                    <div onClick={()=> props.handleClick(1)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                        1
                    </div>

                    <div className="flex justify-center items-center w-[40px] h-[40px] border hover:bg-gray-200">
                        2
                    </div>

                    {pagesCount >= 3 &&
                        <div onClick={()=> props.handleClick(3)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                            3
                        </div>
                    }

                    {pagesCount >= 4 &&
                        <div onClick={()=> props.handleClick(4)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                            4
                        </div>
                    }
                </div>
            }

            {/* if it was on third page */}
            {(props.current === 3) &&
                <div className="flex gap-2">
                    <div onClick={()=> props.handleClick(1)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                        1
                    </div>

                    <div onClick={()=> props.handleClick(2)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                        2
                    </div>

                    <div className="flex justify-center items-center w-[40px] h-[40px] border hover:bg-gray-200">
                        3
                    </div>

                    {pagesCount >= 4 &&
                        <div  onClick={()=> props.handleClick(4)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                            4
                        </div>
                    }

                    {pagesCount >= 5 &&
                        <div onClick={()=> props.handleClick(5)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                            5
                        </div>
                    }
                </div>
            }

            {/* if it was on some middle pages */}
            {(props.current > 3 && props.current < pagesCount - 2) &&
                <div className="flex gap-2">
                    <div onClick={()=> props.handleClick(props.current - 2)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                        {props.current - 2}
                    </div>

                    <div onClick={()=> props.handleClick(props.current - 1)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                        {props.current - 1}
                    </div>

                    <div className="flex justify-center items-center w-[40px] h-[40px] border hover:bg-gray-200">
                        {props.current}
                    </div>

                    <div onClick={()=> props.handleClick(props.current + 1)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                        {props.current + 1}
                    </div>

                    <div onClick={()=> props.handleClick(props.current + 2)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                        {props.current + 2}
                    </div>
                </div>
            }

            {/* if it was on last page */}
            {(props.current === pagesCount) &&
                <div className="flex gap-2">
                    {(props.current - 2 > 0) &&
                        <div onClick={()=> props.handleClick(props.current - 2)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                            {props.current - 2}
                        </div>
                    }

                    {(props.current - 1 > 0) &&
                        <div onClick={()=> props.handleClick(props.current - 1)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                            {props.current - 1}
                        </div>
                    }

                    <div className="flex justify-center items-center w-[40px] h-[40px] border hover:bg-gray-200">
                        {props.current}
                    </div>
                </div>
            }

            {/* if it was on second last page */}
            {(props.current === pagesCount - 1) &&
                <div className="flex gap-2">
                    {(props.current - 2 > 0) &&
                        <div onClick={()=> props.handleClick(props.current - 2)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                            {props.current - 2}
                        </div>
                    }

                    {(props.current - 1 > 0) && 
                    <div onClick={()=> props.handleClick(props.current - 1)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                        {props.current - 1}
                    </div>
                    }

                    <div className="flex justify-center items-center w-[40px] h-[40px] border hover:bg-gray-200">
                        {props.current}
                    </div>

                    <div onClick={()=> props.handleClick(pagesCount)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                        {pagesCount}
                    </div>
                </div>
            }

            {/* if it was on third last page */}
            {(props.current === pagesCount - 2) &&
                <div className="flex gap-2">
                    {(props.current - 2 > 0) &&
                        <div onClick={()=> props.handleClick(props.current - 2)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                            {props.current - 2}
                        </div>
                    }

                    {(props.current - 1 > 0) && 
                    <div onClick={()=> props.handleClick(props.current - 1)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                        {props.current - 1}
                    </div>
                    }

                    <div className="flex justify-center items-center w-[40px] h-[40px] border hover:bg-gray-200">
                        {props.current}
                    </div>

                    <div onClick={()=> props.handleClick(props.current + 1)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                        {props.current + 1}
                    </div>

                    <div onClick={()=> props.handleClick(props.current + 2)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                        {props.current + 2}
                    </div>
                </div>
            }

            {/* 3 dots between current and last page */}
            {(props.current < pagesCount - 3) &&
                <div className="flex justify-center items-center w-[40px] h-[40px]">
                    ...
                </div>
            }

            {/* last page */}
            {(props.current < pagesCount - 2) &&
                <div onClick={()=> props.handleClick(pagesCount)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                    {pagesCount}
                </div>
            }

            {/* left arrow */}
            {(props.current < pagesCount) &&
                <div onClick={()=> props.handleClick((prev:number) => prev+1)} className="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200">
                    <CaretLeft />
                </div>
            }
        </div>
    )

}