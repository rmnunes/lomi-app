import { Wallet, ExternalLink, Coins, LogOut, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";
import { BrowserProvider, formatEther } from "ethers";

// Define Ethereum provider type
interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (eventName: string, callback: (...args: unknown[]) => void) => void;
  removeListener: (eventName: string, callback: (...args: unknown[]) => void) => void;
  selectedAddress?: string;
  isMetaMask?: boolean;
  // Add other properties as needed
}

export default function Navbar() {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if Ethereum provider exists
    const checkProvider = async () => {
      const ethereum = (window as { ethereum?: EthereumProvider }).ethereum;
      setHasProvider(!!ethereum);
    };

    checkProvider();
  }, []);

  // Close dropdown and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch balance when account changes
  useEffect(() => {
    const getBalance = async () => {
      if (!account) return;

      try {
        const ethereum = (window as { ethereum?: EthereumProvider }).ethereum;
        if (!ethereum) return;
        
        const provider = new BrowserProvider(ethereum);
        const balance = await provider.getBalance(account);
        setBalance(formatEther(balance));
      } catch (err) {
        console.error("Error fetching balance:", err);
        setBalance(null);
      }
    };

    getBalance();
  }, [account]);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const ethereum = (window as { ethereum?: EthereumProvider }).ethereum;

      if (!ethereum) {
        setError("No Metamask detected. Please install Metamask to continue.");
        setIsConnecting(false);
        return;
      }

      // Request account access
      const provider = new BrowserProvider(ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setError("No accounts found");
      }
    } catch (err) {
      console.error("Error connecting to wallet:", err);
      setError("Failed to connect to wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  // Format account address for display
  const formatAccount = (account: string) => {
    return `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
  };

  // Format balance for display
  const formatBalance = (balance: string) => {
    const num = parseFloat(balance);
    return num.toFixed(4);
  };

  // Handle install Metamask click
  const handleInstallMetamask = () => {
    window.open("https://metamask.io/download/", "_blank");
  };

  // Handle disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    setDropdownOpen(false);
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex justify-center w-full py-4">
      <nav className="flex items-center justify-between px-4 sm:px-6 py-4 bg-gradient-to-r from-[#1c1c2e] to-[#14141f] rounded-full shadow-xl w-full max-w-5xl mx-2 sm:mx-4">
        <div className="text-2xl font-bold text-white">lomi.</div>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          <li className="text-lime-400">Home</li>
          <li>Campaigns</li>
          <li>How it works</li>
          <li>About</li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-1 focus:outline-none" 
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {error && (
          <div className="absolute top-20 right-4 bg-red-500 text-white p-3 rounded-md shadow-lg max-w-xs z-50 animate-fadeIn">
            {error}
            <button className="ml-2 font-bold" onClick={() => setError(null)}>
              ×
            </button>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="absolute top-20 left-4 right-4 bg-[#1c1c2e] rounded-xl shadow-lg z-50 md:hidden animate-fadeIn"
          >
            <ul className="py-4 text-white">
              <li className="px-6 py-3 text-lime-400 font-medium">Home</li>
              <li className="px-6 py-3 font-medium">Campaigns</li>
              <li className="px-6 py-3 font-medium">How it works</li>
              <li className="px-6 py-3 font-medium">About</li>
            </ul>
          </div>
        )}

        {/* Wallet Connection Section */}
        <div className="hidden md:block">
          {account ? (
            <div className="flex items-center relative" ref={dropdownRef}>
              <div className="mr-3 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Connected</div>
              <div className="flex flex-col items-end mr-3">
                <div className="text-white text-sm font-medium">{formatAccount(account)}</div>
                <div className="flex items-center text-lime-400 text-xs">
                  <Coins className="mr-1 h-3 w-3" />
                  {balance ? `${formatBalance(balance)} ETH` : "Loading..."}
                </div>
              </div>
              <Button className="bg-lime-500 hover:bg-lime-600 text-white rounded-full px-5 py-2 flex items-center" onClick={toggleDropdown}>
                <Wallet className="h-4 w-4" />
                <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </Button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-[#1c1c2e] ring-1 ring-black ring-opacity-5 z-50 animate-fadeIn">
                  <div className="py-1">
                    <button onClick={disconnectWallet} className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[#14141f] transition-colors">
                      <LogOut className="mr-2 h-4 w-4 text-red-400" />
                      Disconnect Wallet
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : hasProvider === false ? (
            <Button className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-5 py-2" onClick={handleInstallMetamask}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Install Metamask
            </Button>
          ) : (
            <Button className="bg-lime-500 hover:bg-lime-600 text-white rounded-full px-5 py-2" onClick={connectWallet} disabled={isConnecting}>
              <Wallet className="mr-2 h-4 w-4" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}
        </div>

        {/* Mobile Wallet Button */}
        <div className="md:hidden">
          {!mobileMenuOpen && (
            account ? (
              <Button 
                className="bg-lime-500 hover:bg-lime-600 text-white rounded-full w-10 h-10 p-0 flex items-center justify-center" 
                onClick={toggleDropdown}
              >
                <Wallet className="h-5 w-5" />
              </Button>
            ) : hasProvider === false ? (
              <Button 
                className="bg-amber-500 hover:bg-amber-600 text-white rounded-full w-10 h-10 p-0 flex items-center justify-center" 
                onClick={handleInstallMetamask}
              >
                <ExternalLink className="h-5 w-5" />
              </Button>
            ) : (
              <Button 
                className="bg-lime-500 hover:bg-lime-600 text-white rounded-full w-10 h-10 p-0 flex items-center justify-center" 
                onClick={connectWallet} 
                disabled={isConnecting}
              >
                <Wallet className="h-5 w-5" />
              </Button>
            )
          )}
        </div>
      </nav>
    </div>
  );
}
