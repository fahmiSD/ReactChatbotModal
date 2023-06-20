import { useState, useEffect } from "react";
import "./App.css";
import Chatbox from "./components/ChatBox";

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			{/* chatbox */}
			<div className="fixed bottom-0 right-0 p-4 ">
				<button
					onClick={openModal}
					className={`p-0 w-12 h-12 bg-[#3558A7] rounded-full hover:bg-[#5A96E3] active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none flex items-center justify-center ${
						isModalOpen ? "animate-pulse" : ""
					}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						strokeWidth="1.5"
						stroke="white"
						className="w-8 h-8"
						viewBox="0 0 25 25"
						enableBackground="new 0 0 25 25"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
						/>
					</svg>
				</button>

				<Chatbox isVisible={isModalOpen} onClose={closeModal}></Chatbox>
			</div>
		</>
	);
}

export default App;
