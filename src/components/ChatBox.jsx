import { useState, useRef, useEffect } from "react";

export default function Modal({ isVisible, onClose }) {
	const greetings = [
		{
			id: 1,
			text: "Hey there, how can I assist you today?",
			isUser: false,
			isTyping: true,
		},
		{
			id: 2,
			text: "Hello, how may I help you?",
			isUser: false,
			isTyping: true,
		},
		{
			id: 3,
			text: "Greetings! What can I do for you?",
			isUser: false,
			isTyping: true,
		},
		{
			id: 4,
			text: "Hi there! How can I assist you today?",
			isUser: false,
			isTyping: true,
		},
		{
			id: 5,
			text: "Welcome! How may I be of service?",
			isUser: false,
			isTyping: true,
		},
	];

	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (isVisible) {
			const randomIndex = Math.floor(Math.random() * greetings.length);
			const randomGreeting = greetings[randomIndex];
			setMessages([randomGreeting]);
		} else {
			setMessages([]);
		}
	}, [isVisible]);

	console.log("isVisible : ", isVisible);
	const [inputText, setInputText] = useState("");

	const handleInputChange = (e) => {
		setInputText(e.target.value);
	};

	const dummyResponse = [
		{
			text: "I'm sorry, but I need more information or a specific question in order to provide a helpful response. Could you please provide more details or clarify your question?",
		},
		{
			text: "It seems like your question is quite broad. Can you please provide more specific details or narrow down your inquiry?",
		},
		{
			text: "I'm afraid I can't provide a precise answer without more context. Could you please elaborate on your question?",
		},
		{
			text: "To assist you better, I would need additional information or a clearer question. Can you please provide more details?",
		},
		{
			text: "I'm sorry, I'm having trouble understanding your question. Could you please rephrase or provide more specific information?",
		},
		{
			text: "It seems like your question requires more details to provide an accurate response. Could you please provide further information?",
		},
		{
			text: "I apologize, but I need more context to provide a relevant answer. Could you please provide more information?",
		},
		{
			text: "I'm sorry, but I couldn't understand your question clearly. Can you please provide more specific information or rephrase your inquiry?",
		},
		{
			text: "To assist you better, I need more information about your query. Could you please provide additional details?",
		},
		{
			text: "I'm sorry, but I'm unable to provide a helpful response without more context. Can you please provide more information or specify your question?",
		},
	];

	const [isLoading, setIsLoading] = useState(false);

	const LoadingIndicator = () => (
		<div className="dot-container">
			<span className="dot"></span>
			<span className="dot"></span>
			<span className="dot"></span>
		</div>
	);

	const addRandomResponseWithDelay = () => {
		const randomIndexResponse = Math.floor(
			Math.random() * dummyResponse.length
		);
		const randomResponse = dummyResponse[randomIndexResponse];
		setMessages((prevMessages) => [
			...prevMessages,
			{
				id: Date.now() + 1,
				text: randomResponse.text,
				isUser: false,
				isTyping: true,
				isLoading: true,
			},
		]);
	};

	const handleSend = () => {
		setIsLoading(true);
		setMessages((prevMessages) => [
			...prevMessages,
			{ id: Date.now(), text: inputText, isUser: true },
		]);

		setInputText("");
		const inputElement = document.getElementById("inputText");
		if (inputElement) {
			inputElement.blur();
		}

		setTimeout(() => {
			setIsLoading(false);
		}, 2000);

		addRandomResponseWithDelay();
	};

	const onFormSubmit = (e) => {
		e.preventDefault();
		// send state to server with e.g. `window.fetch`
	};

	const messagesContainerRef = useRef(null);

	const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

	const scrollToBottom = () => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		if (shouldScrollToBottom) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight;
			setShouldScrollToBottom(false);
		}
	}, [shouldScrollToBottom, messages]);

	useEffect(() => {
		if (messagesContainerRef.current) {
			scrollToBottom();
		}
	}, [messagesContainerRef]);

	const [isInputFocused, setIsInputFocused] = useState(false);

	console.log(messages);

	const handleInputFocus = () => {
		setIsInputFocused(true);
	};

	const handleInputBlur = () => {
		setIsInputFocused(false);
	};

	const TypingAnimation = ({ text }) => {
		const [animatedText, setAnimatedText] = useState("");

		useEffect(() => {
			let currentText = "";
			let currentIndex = 0;

			const typingTimeout = setTimeout(() => {
				const typingInterval = setInterval(() => {
					currentText += text[currentIndex];
					setAnimatedText(currentText);
					currentIndex++;

					if (currentIndex === text.length) {
						scrollToBottom();
						clearInterval(typingInterval);
					}
				}, 50); // Adjust the delay between each character

				return () => {
					scrollToBottom();
					clearInterval(typingInterval);
				};
			}, 1300); // Adjust the initial delay before starting the animation

			return () => {
				clearTimeout(typingTimeout);
				scrollToBottom();
			};
		}, [text]);

		return <div>{animatedText}</div>;
	};

	if (!isVisible) return null;
	const handleClose = (e) => {
		if (e.target.id === "outSide") onClose();
		console.log("closedClicked");
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ">
			<div className="flex h-full antialiased text-gray-800 w-2/3">
				<div className="flex flex-row h-[80%] w-full">
					<div className="flex flex-col flex-auto h-full">
						<div
							className="flex flex-col rounded-2xl bg-gray-100 h-[600px] overflow-auto p-4 mt-auto"
							style={{
								boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
							}}
							ref={messagesContainerRef}
						>
							<div
								className="flex flex-col overflow-auto mb-[70px] shrink-0 grow-0"
								ref={messagesContainerRef}
							>
								<div className="grid grid-cols-12 gap-y-2 shrink-0 grow-0">
									{messages.map((chat, index) => (
										<div
											key={index}
											className={`col-start-1 ${
												chat.isUser !== false
													? "col-end-13 col-start-4"
													: "col-end-8 col-start-1"
											} p-1 rounded-lg text-left`}
										>
											<div
												className={`flex ${
													chat.isUser !== false
														? "justify-start flex-row-reverse"
														: "flex-row items-start"
												} text-left`}
											>
												{isLoading &&
												!chat.isUser &&
												index === messages.length - 1 ? (
													<>
														<div className="relative ml-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-none text-left">
															<div className="text-left">
																<LoadingIndicator />
															</div>
														</div>
													</>
												) : (
													<>
														<div
															className={`relative ml-3 text-sm ${
																chat.isUser !== false
																	? "bg-white"
																	: "bg-indigo-100"
															} py-2 px-4 shadow rounded-tl-2xl rounded-tr-2xl  ${
																chat.isUser !== false
																	? "rounded-bl-2xl rounded-br-none"
																	: "rounded-br-2xl rounded-bl-none"
															} text-left`}
														>
															<div
																className={`${
																	chat.isUser === false && chat.isTyping
																		? "typing-animation"
																		: ""
																} text-left`}
																key={chat.id}
															>
																{chat.isUser === false &&
																index === messages.length - 1 &&
																!isInputFocused ? (
																	<TypingAnimation text={chat.text} />
																) : (
																	<div>{chat.text}</div>
																)}
															</div>
														</div>
													</>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						<form onSubmit={onFormSubmit} className="z-10">
							<div className="flex justify-center">
								<div className="flex flex-row items-center h-16 rounded-xl border-[#F3F4F6] border-4 bg-white w-[100%] -mt-[64px] px-4 my-4 ">
									<div className="mr-4">
										<button
											type="submit"
											className={`flex items-center justify-center rounded-xl text-white px-4 py-1 flex-shrink-0 bg-[#DD3B30] hover:bg-[#EA4C46]`}
											onClick={handleClose}
											id="outSide"
										>
											<span onClick={handleClose} id="outSide">
												End
											</span>
											<span className="ml-2">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="w-5 h-5"
													onClick={handleClose}
													id="outSide"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
													/>
												</svg>
											</span>
										</button>
									</div>
									<div className="flex-grow">
										<div className="relative w-full">
											<input
												type="text"
												id="inputText" // Add this line
												value={inputText}
												className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
												onChange={handleInputChange}
												onFocus={handleInputFocus}
												onBlur={handleInputBlur}
											/>
										</div>
									</div>
									<div className="ml-4">
										<button
											type="submit"
											className={`flex items-center justify-center rounded-xl text-white px-4 py-1 flex-shrink-0 ${
												inputText.trim() === ""
													? "bg-[#A1C2F1]"
													: "bg-[#3558A7] hover:bg-[#5A96E3]"
											}`}
											onClick={handleSend}
											disabled={inputText.trim() === ""}
										>
											<span>Send</span>
											<span className="ml-2">
												<svg
													className="w-4 h-4 transform rotate-45 -mt-px"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
													></path>
												</svg>
											</span>
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
