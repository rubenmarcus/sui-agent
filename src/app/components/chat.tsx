"use client";

import {
  useCurrentWallet,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction  } from "@mysten/sui/transactions";
import { useState, useEffect, useRef } from "react";

type Message = {
  id: number;
  text: any;
  sender: "user" | "system";
};

const packageObjectId = process.env.NEXT_PUBLIC_PACKAGE;
const moduleName = "devnet_nft";

export default function TerminalChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [digest, setDigest] = useState("");

  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const { connectionStatus } = useCurrentWallet();

  const handleMint = async (
    name: string,
    description: string,
    imageUrl: string
  ) => {


    try {
      const tx = new Transaction();

      tx.moveCall({
        target: `${packageObjectId}::${moduleName}::mint`,
        arguments: [
          tx.pure(new TextEncoder().encode(name)),
          tx.pure(new TextEncoder().encode(description)),
          tx.pure(new TextEncoder().encode(imageUrl)),
        ],
      });

      const result = signAndExecute(
        {
          transaction: new Transaction(),
          chain: "sui:devnet",
        },
        {
          onSuccess: (result) => {
            console.log("executed transaction", result);
            setDigest(result.digest);
          },
        }
      );

      console.log("NFT Minted successfully:", result);
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesEndRef]); //Fixed unnecessary dependency

  const handleSendMessage = async (e: React.FormEvent) => {

    setDigest('')

    e.preventDefault();
    if (inputMessage.trim() !== "") {
      const newMessage: Message = {
        id: Date.now(),
        text: inputMessage,
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");
      setIsLoading(true); // Start loading

      try {
        // Call the server-side API endpoint
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputMessage }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data[0]?.url) {
          const systemMessage: Message = {
            id: Date.now(),
            text: data[0].revised_prompt,
            sender: "system",
          };

          const imageMessage: Message = {
            id: Date.now() + 1, // Ensure unique ID
            text: data[0].url,
            sender: "system",
          };

          setMessages((prevMessages) => [
            ...prevMessages,
            systemMessage,
            imageMessage,
          ]);

        } else {
          const systemMessage: Message = {
            id: Date.now(),
            text: data.response,
            sender: "system",
          };

          setMessages((prevMessages) => [...prevMessages, systemMessage]);
        }
      } catch (error) {
        console.error("Error processing message:", error);
        const errorMessage: Message = {
          id: Date.now(),
          text: "An error occurred while processing your request.",
          sender: "system",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false); // End loading
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-3xl h-[80vh] flex flex-col bg-terminal-bg text-terminal-text font-mono p-4 border border-terminal-border rounded-lg overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-2 mb-4">
          {messages.length === 0 ? (
              <div className="text-terminal-text text-white">
                 {connectionStatus !== "connected" ? "Please connect and type" : "Please type"} something like: generate a cat image
            </div>
          ): messages.map((message) => {
            if (
              message.sender !== "user" &&
              message.text.data?.[0].url.includes("https")
            ) {
              return (
                <div
                  key={message.id}
                  className="break-words text-terminal-text text-white"
                >
                  <span className="text-terminal-text text-white">
                    $ {message.text.data?.[0].revised_prompt}{" "}
                  </span>
                  <img
                    src={message.text.data?.[0].url}
                    alt="Image"
                    className="max-w-full h-auto"
                  />

                  {connectionStatus === "connected" && !digest ? (
                    <>
                      <h1>do you want to mint this image?</h1>
                      <div className="flex w-full justify-center">
                        <button
                          onClick={() =>
                            handleMint(
                              "ai minting",
                              message.text.data?.[0].revised_prompt,
                              message.text.data?.[0].url
                            )
                          }
                          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Yes
                        </button>
                        <button className="border border-terminal-border text-terminal-text  px-4 py-2 rounded">
                          No
                        </button>
                      </div>
                    </>
                  ) : digest ? (
                    <>
                      {" "}
                      <div className="m-auto text-center w-full">
                        <div className="flex justify-center flex-wrap items-center align-center text-green-500">
                          <h1 className=" ">

                            NFT Minted Successfully!
                          </h1>
                        </div>
                        <div>
                          Check your transaction on{" "}
                          <a
                            href={`https://suiscan.xyz/devnet/tx/${digest}`}
                            target="blank"
                            className="text-terminal-text underline"
                          >
                            Sui Scan
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <h1> Please connect to your SUI account</h1>
                  )}
                </div>
              );
            }

            const lines =
              !message?.text?.data && message?.text?.includes("\n")
                ? message.text.split("\n")
                : [message.text];
            return (
              <div
                key={message.id}
                className={
                  message.sender === "user"
                    ? "break-words text-terminal-text font-bold"
                    : "break-words text-terminal-text text-white"
                }
              >
                <div>
                  <span
                    className={
                      message.sender === "user"
                        ? "text-terminal-text font-bold"
                        : "text-terminal-text text-white"
                    }
                  >
                    {message.sender === "user" ? "> " : "$ "}
                  </span>
                  {lines[0]}
                </div>
                {lines.slice(1).map((line: string, index: number) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            );
          })}

          {isLoading && (
            <div className="text-terminal-text text-white animate-pulse">
              Loading...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={handleSendMessage}
          className="flex items-center border-t border-terminal-border pt-4"
        >
          <span className="text-terminal-text font-bold mr-2">{">"}</span>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`flex-1 bg-transparent border-none outline-none text-terminal-text placeholder-terminal-text/50 ${
              isFocused ? "focused" : ""
            }`}
            placeholder="Enter command..."
          />
        </form>
      </div>
    </div>
  );
}
