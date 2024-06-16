"use client";

import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useEffect, useRef, useState } from "react";

const Search = ({
	search,
	types,
}: {
	search?: string;
	types: { name: string; url?: string }[];
}) => {
	const router = useRouter();
	const initialRender = useRef(true);
	const [text, setText] = useState(search);
	const [type, setType] = useState("");

	const [query] = useDebounce(text, 1750);

	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false;
			return;
		}
		if (!query) {
			router.push("/");
		} else {
			router.push(`?search=${query}`);
		}
	}, [query]);

	useEffect(() => {
		if (type) {
			router.push(`?type=${type}`);
		}else {
			router.push("/");
		}
	}, [type]);

	return (
		<div className="flex justify-center flex-col w-[100%] pl-[5%] pr-[5%] mx-auto max-w-[1500px] bg-gray-200" style={{position:"sticky", top:0}}>
			<select
				onChange={(e) => setType(e.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:max-w-[30%] md:max-w-[100%]"
			>
				<option value="">All Types</option>
				{types.map((type) => (
					<option key={type.name} value={type.name}>
						{type.name}
					</option>
				))}
			</select>

			<div className="relative py-3.5 lg:max-w-[50%] md:max-w-[100%]">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-5.2-5.2M15 11a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg>
				</div>

				<input
					type="text"
					value={text}
					placeholder="Search ..."
					onChange={(e) => setText(e.target.value)}
					className="pl-10 pt-3.5 pb-3.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-900 "
				/>
				<button className="absolute inset-y-0 right-0 py-1.5 pr-2 bg-bermuda text-white rounded-md focus:outline-none h-auto py-3 px-2 border-b-0 border-l-0 rounded-bl-none rounded-tl-none self-center">
					Search
				</button>
			</div>
		</div>
	);
};

export default Search;
