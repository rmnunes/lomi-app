import { Wallet, ExternalLink, Coins, LogOut, ChevronDown, Menu, X, AlertCircle, AlertTriangle, Info } from "lucide-react";
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
  const [error, setError] = useState<{ message: string; type: 'error' | 'warning' | 'info'; action?: { text: string; onClick: () => void } } | null>(null);
  const [errorVisible, setErrorVisible] = useState(false);
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

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (error) {
      setErrorVisible(true);
      const timer = setTimeout(() => {
        setErrorVisible(false);
        setTimeout(() => setError(null), 500); // Clear error after fade out animation
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);
        
        try {
      const ethereum = (window as { ethereum?: EthereumProvider }).ethereum;

      if (!ethereum) {
        setError({
          message: "No Metamask detected. Please install Metamask to continue.",
          type: 'warning',
          action: {
            text: "Install Metamask",
            onClick: handleInstallMetamask
          }
        });
        setIsConnecting(false);
        return;
      }

      // Request account access
      const provider = new BrowserProvider(ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setError({
          message: "No accounts found in your wallet. Please create an account in Metamask.",
          type: 'warning'
        });
      }
    } catch (err) {
      console.error("Error connecting to wallet:", err);
      
      // Handle user rejected request error
      const error = err as { code?: number; message?: string };
      if (error.code === 4001) {
        setError({
          message: "You rejected the connection request. Please approve the connection to continue.",
          type: 'info'
        });
      } else if (error.code === -32002) {
        setError({
          message: "Connection request already pending. Please check your Metamask extension.",
          type: 'info'
        });
      } else {
        setError({
          message: "Failed to connect to wallet. Please try again.",
          type: 'error'
        });
      }
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
    // Simulate error notification for testing
    setError({
      message: "No Metamask detected. Please install Metamask to continue.",
      type: 'warning',
      action: {
        text: "Install Metamask",
        onClick: () => { window.open("https://metamask.io/download/", "_blank"); }
      }
    });
    // Explicitly set error visible to true
    setErrorVisible(true);
    
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
      <nav className="flex items-center justify-between px-4 sm:px-6 py-4 bg-gradient-to-r from-[#1c1c2e] to-[#14141f] rounded-full shadow-xl w-full max-w-5xl mx-2 sm:mx-4 transition-all animate-gradient">
        <div className="text-2xl font-bold text-white bg-glow">lomi.</div>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          <li className="text-lime-400 hover:text-lime-300 transition-all cursor-pointer">Home</li>
          <li className="hover:text-lime-400 transition-all cursor-pointer">Campaigns</li>
          <li className="hover:text-lime-400 transition-all cursor-pointer">How it works</li>
          <li className="hover:text-lime-400 transition-all cursor-pointer">About</li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-1 focus:outline-none hover:text-lime-400 transition-all" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Error Notification */}
        {error && (
          <div 
            className={`fixed top-24 right-4 p-0 rounded-xl shadow-2xl max-w-sm z-50 transition-all duration-300 ${
              errorVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <div className={`flex items-start p-5 rounded-xl border border-white/10 backdrop-blur-sm ${
              error.type === 'error' 
                ? 'bg-gradient-to-r from-red-600/95 to-red-500/95' 
                : error.type === 'warning'
                  ? 'bg-gradient-to-r from-amber-600/95 to-amber-500/95'
                  : 'bg-gradient-to-r from-blue-600/95 to-blue-500/95'
            }`}>
              <div className="flex-shrink-0 mr-4 mt-0.5">
                {error.type === 'error' && <AlertCircle className="h-6 w-6 text-white animate-pulse" />}
                {error.type === 'warning' && <AlertTriangle className="h-6 w-6 text-white animate-pulse" />}
                {error.type === 'info' && <Info className="h-6 w-6 text-white animate-pulse" />}
              </div>
              <div className="flex-1">
                <p className="text-base font-medium text-white">{error.message}</p>
                {error.action && (
                  <button 
                    onClick={error.action.onClick}
                    className="mt-3 px-4 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-full transition-colors hover-lift"
                  >
                    {error.action.text}
                  </button>
                )}
              </div>
              <button 
                className="ml-4 flex-shrink-0 text-white/80 hover:text-white transition-colors" 
                onClick={() => setErrorVisible(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="absolute top-20 left-4 right-4 bg-gradient-to-b from-[#1c1c2e] to-[#14141f] rounded-xl shadow-lg z-50 md:hidden animate-slideDown"
          >
            <ul className="py-4 text-white">
              <li className="px-6 py-3 text-lime-400 font-medium hover:bg-[#ffffff10] transition-all cursor-pointer">Home</li>
              <li className="px-6 py-3 font-medium hover:bg-[#ffffff10] transition-all cursor-pointer">Campaigns</li>
              <li className="px-6 py-3 font-medium hover:bg-[#ffffff10] transition-all cursor-pointer">How it works</li>
              <li className="px-6 py-3 font-medium hover:bg-[#ffffff10] transition-all cursor-pointer">About</li>
            </ul>
          </div>
        )}

        {/* Wallet Connection Section */}
        <div className="hidden md:block">
          {account ? (
            <div className="flex items-center relative" ref={dropdownRef}>
              <div className="mr-3 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm animate-pulse">Connected</div>
              <div className="flex flex-col items-end mr-3">
                <div className="text-white text-sm font-medium">{formatAccount(account)}</div>
                <div className="flex items-center text-lime-400 text-xs">
                  <Coins className="mr-1 h-3 w-3" />
                  {balance ? `${formatBalance(balance)} ETH` : "Loading..."}
                </div>
              </div>
              <Button className="bg-gradient-to-r from-lime-500 to-lime-400 hover:from-lime-400 hover:to-lime-300 text-white rounded-full px-5 py-2 flex items-center hover-lift" onClick={toggleDropdown}>
                <Wallet className="h-4 w-4" />
                <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </Button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-gradient-to-b from-[#1c1c2e] to-[#14141f] ring-1 ring-black ring-opacity-5 z-50 animate-slideDown">
                  <div className="py-1">
                    <button onClick={disconnectWallet} className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[#ffffff10] transition-all">
                      <LogOut className="mr-2 h-4 w-4 text-red-400" />
                      Disconnect Wallet
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : hasProvider === false ? (
            <Button className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-white rounded-full px-5 py-2 hover-lift" onClick={handleInstallMetamask}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Install Metamask
            </Button>
          ) : (
            <Button className="bg-gradient-to-r from-lime-500 to-lime-400 hover:from-lime-400 hover:to-lime-300 text-white rounded-full px-5 py-2 hover-lift" onClick={connectWallet} disabled={isConnecting}>
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
                className="bg-gradient-to-r from-lime-500 to-lime-400 hover:from-lime-400 hover:to-lime-300 text-white rounded-full w-10 h-10 p-0 flex items-center justify-center hover-scale" 
                onClick={toggleDropdown}
                aria-label="Wallet options"
              >
                <Wallet className="h-5 w-5" />
              </Button>
            ) : hasProvider === false ? (
              <Button 
                className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-white rounded-full w-10 h-10 p-0 flex items-center justify-center hover-scale" 
                onClick={handleInstallMetamask}
                aria-label="Install Metamask"
              >
                <ExternalLink className="h-5 w-5" />
              </Button>
            ) : (
              <Button 
                className="bg-gradient-to-r from-lime-500 to-lime-400 hover:from-lime-400 hover:to-lime-300 text-white rounded-full w-10 h-10 p-0 flex items-center justify-center hover-scale" 
                onClick={connectWallet} 
                disabled={isConnecting}
                aria-label="Connect wallet"
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
