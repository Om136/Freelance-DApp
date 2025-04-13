"use client"
import { useState } from "react";
import { acceptContract } from "@/lib/contract";
import { ethers } from "ethers";

const AcceptContract = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");

  const handleAcceptContract = async (role) => {
    if (!role) return alert("Please select a role!");

    try {
      setIsLoading(true);
      const { ethereum } = window;

      // Request user accounts via Metamask
      if (!ethereum) {
        alert("Metamask is required!");
        setIsLoading(false);
        return;
      }

      const signer = await new ethers.BrowserProvider(ethereum).getSigner();
      await acceptContract(signer, role);
      setRole(role);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <div>
      <button
        onClick={() => handleAcceptContract("client")}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Accept Contract as Client"}
      </button>
      <button
        onClick={() => handleAcceptContract("freelancer")}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Accept Contract as Freelancer"}
      </button>
    </div>
  );
};

export default AcceptContract;
