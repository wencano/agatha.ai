
import { Link, Form, useLocation } from "@remix-run/react";
import { useState } from "react";
import { BsThreeDots} from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbMinusVertical } from "react-icons/tb";

import { cn } from "~/utils";

interface Props {
  data: {
    chatListItems?: {
      id?: string;
      question: string;
      href?: string;
    }[]
  }
}

interface Timeline {
  label: string;
  timelines: {
    id?: string;
    question: string;
    href?: string;
  }[];
};

export default function Sidebar({ data }: Props) {
  const [isSidebar, setSidebar] = useState(true);
  
  function toggleSidebar() {
    setSidebar(!isSidebar);
  }

  return (
    <div
      className={cn("min-h-screen relative transition-all ", {
        "-translate-x-full": !isSidebar,
        "w-full  max-w-[244px]": isSidebar
      })}
    >
      {isSidebar ? <div
          className={cn(
            "  w-full h-full  pl-4 pr-6 pt-20 dark:bg-[#0E0E0E]  flex flex-col bg-gray-200"
          )}
        >
          {/* new chat btn */}
          <div className="absolute top-5 left-0 pl-4 pr-6 w-full ">
            <Link
              to={"/"}
              className="flex  dark:bg-[#0E0E0E] justify-between w-full items-center p-2 hover:bg-slate-800 hover:text-white rounded-lg transition-all "
            >
              <section className="flex items-center gap-2">
                {/* logo */}
                <div className=" h-7 w-7 bg-white p-1 rounded-full">
                  <img src="/chatgpt-log.svg" alt="" />
                </div>

                <p className="text-sm">New Forecast</p>
              </section>

              <FiEdit className=" text-sm" />
            </Link>
          </div>

          {/* timeles */}
          <div className="w-full flex flex-col flex-1 gap-5 overflow-y-auto">
            <Timeline label={"Today"} timelines={(data.chatListItems||[]).map(l=>({...l, href: `/chats/${l.id}`}))} />
          </div>

        </div> : null
      }

      <div className=" absolute inset-y-0 right-[-30px]  flex items-center justify-center w-[30px]">
        <button
          onClick={toggleSidebar}
          className=" h-[100px] group  text-gray-500 hover:text-white   w-full flex items-center justify-center  transition-all   "
        >
          {/* <FaChevronLeft /> */}
          <FaChevronLeft className="hidden group-hover:flex  text-xl    delay-500 duration-500 ease-in-out transition-all" />
          <TbMinusVertical className="text-3xl group-hover:hidden   delay-500 duration-500 ease-in-out  transition-all" />
        </button>
      </div>
    </div>
  );
}

function Timeline(props: Timeline) {
  const pathName = useLocation().pathname;

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if(!confirm('Are you sure you want to delete?')) e.preventDefault();
  }

  //
  return (
    <div className="w-full flex flex-col  ">
      <p className="text-sm text-gray-500 font-bold p-2">{props.label}</p>

      {props.timelines.map((d, i) => (
        <Link
          key={i}
          className={
            "p-2 group ease-in-out duration-300 hover:bg-slate-800 hover:text-white rounded-lg transition-all items-center text-sm w-full flex justify-between  " +
            (d.href === pathName ? "bg-slate-800 text-white" : '')
          }
          to={d.href || d.id || ""}
        >
          
          <div className="text-ellipsis overflow-hidden w-[80%] whitespace-nowrap">
            {d.question}
          </div>
          <div className="  transition-all items-center gap-2 hidden group-hover:flex ease-in-out duration-300 ">
            <BsThreeDots className="text-white" />
            {/* <BsArchiveFill className="text-white" /> */}
            <Form method="post" action={`/chats/${d.id}`}>
              <button type="submit" onClick={handleDelete} ><RiDeleteBin5Line className="text-white" /></button>
            </Form>
          </div>
        </Link>
      ))}
    </div>
  );
}


