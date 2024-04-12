/* eslint-disable jsx-a11y/anchor-is-valid */
import { Form } from "@remix-run/react";
import { useState, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";


const cardData = [
  {
    heading: "Senate bets for 2025 elections",
    description: "Possible line-up for incoming senators"
  },
  {
    heading: "Philippines GDP by 2030",
    description: "Estimate GDP figures"
  },
  {
    heading: "Global population 2040",
    description: "Forecast population by region"
  },
  {
    heading: "Post AGI economics",
    description: "What does post-AGI looks like"
  }
];

export default function ChatIndexPage() {
  const [isOpen, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null)
  
  return (
    
    <main className="h-full  w-full p-4 ">

      <div className="h-full flex flex-col justify-between gap-3 pb-5 ">
        
        <div className="relative inline-block text-left">
        
          {/* nav */}
          <button id="model-dropdown-toggle" 
            className="text-lg font-bold flex items-center gap-2  rounded-xl p-2 hover:bg-slate-800 hover:text-white transition-all w-fit " data-dropdown-toggle="model-dropdown" 
            onClick={()=>setOpen(!isOpen)}
          >
            <p>Agatha 1.0</p>
            <FaChevronDown className="text-xs text-gray-500  " />
          </button>

          <div id="model-dropdown" className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 
            ${isOpen ? 'block' : 'hidden' }`
          }>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="model-dropdown-toggle">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>setOpen(!isOpen)}>Arthur 1.0</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>setOpen(!isOpen)}>Dash 1.0</a>
                </li>
              </ul>
          </div>
        </div>

        {/* main */}
        <main className="flex flex-col items-center text-center justify-center gap-4">
          <div className=" h-10 w-10 bg-white p-1 rounded-full">
            <img src="/chatgpt-log.svg" alt="" />
          </div>

          <p className="text-2xl font-semibold  ">What do you want to forecast?</p>
        </main>
        {/* bottom section */}
        <section className="max-w-3xl mx-auto flex flex-col gap-5">
          {/* card */}
          <div className="grid grid-cols-2 gap-3">
            {cardData.map((d, i) => (
              <Card key={i} discription={d.description} heading={d.heading} onClick={()=>{
                // setQuery(d.heading);
                setQuery( d.heading );
                inputRef.current?.focus();
              }} />
            ))}
          </div>
          {/* Searchbar */}

          <div className="flex relative ">
            <Form 
              method="post"
              action="/chats/new"
              className="w-full "
            >
              <input
                id="chat-question-field"
                type="text"
                name="question"
                placeholder="Message Agatha..."
                title="question-message"
                className="w-full h-12 bg-inherit rounded-xl border border-gray-500 p-4 "
                value={query}
                onChange={e=>setQuery(e.target.value)}
                ref={inputRef}
              />
              <button type="submit" title="Send"
                className={` text-white hover:opacity-80 w-fit rounded-xl p-2 absolute right-2 top-2 
                  ${query ? 'bg-black' : 'bg-gray-300' }
                `}>
                <FaArrowUp />
              </button>
            </Form>
          </div>
        </section>
      </div>
    </main>
  );
}


interface CardProp {
  heading: string;
  discription: string;
  onClick: () => void;
};

function Card(props: CardProp) {
  return (
    <button className="w-full hover:bg-slate-800 hover:text-white transition-all flex flex-col gap-1 p-3 text-sm font-semibold border border-gray-500 rounded-xl"
      onClick={()=>props.onClick()}
    >
      <h2>{props.heading}</h2>
      <p className="text-gray-500">{props.discription}</p>
    </button>
  );
}