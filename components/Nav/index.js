import { MdMarkEmailUnread } from 'react-icons/md';
import { FaTelegram, FaReddit } from 'react-icons/fa';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

import gsap, { Power4 } from 'gsap';

export default function Nav() {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const links = ['Home', 'About', 'Swap', 'Staking', 'Games'];

  // Mobile Menu
  // menu reference
  let menuRef = useRef(null);
  let menuWrapperRef = useRef(null);
  // Refs for link items
  let HomeRef,
    AboutRef,
    SwapRef,
    StakingRef,
    GamesRef,
    NFTRef,
    BtnRef = useRef();

  // state for disabling menu button/span
  const [disabled, setDisabled] = useState(false);

  // Overall state for our menu
  const [menuState, setMenuState] = useState({
    initial: false,
    clicked: null,
    menuText: 'menu',
  });

  const onMenuClick = () => {
    disableMenu();

    if (disabled === false) {
      if (menuState.initial === false) {
        setMenuState({
          initial: null,
          clicked: true,
          menuText: 'close',
        });
      } else if (menuState.clicked === true) {
        setMenuState({
          clicked: false,
          menuText: 'menu',
        });
      } else if (menuState.clicked === false) {
        setMenuState({
          clicked: true,
          menuText: 'close',
        });
      }
    }
  };

  // Determine if the menu should be disabled
  const disableMenu = () => {
    setDisabled(!disabled);

    setTimeout(() => setDisabled(false), 1000);
  };

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: Power4.easeInOut,
        duration: 2,
      },
    });

    if (menuState.clicked === false) {
      // Close the menu
      tl.fromTo(
        [HomeRef, AboutRef, SwapRef, StakingRef, GamesRef, NFTRef, BtnRef],
        { x: 0, opacity: 1 },
        { x: 100, opacity: 0, duration: 0.4, stagger: 0.1 }
      )
        .fromTo(
          [menuWrapperRef],
          { height: '100%', opacity: 1 },
          { height: 0, opacity: 0, duration: 0.8 }
        )
        .to(menuRef, {
          display: 'none',
          duration: 1,
        });
      // console.log(menuRef.style);
    } else if (
      menuState.clicked === true ||
      (menuState.clicked == true && menuState.initial === null)
    ) {
      // Open the menu
      tl.to(menuRef, { display: 'block', duration: 0 })
        .fromTo(
          menuWrapperRef,
          {
            height: 0,
            opacity: 0,
          },
          {
            opacity: 1,
            height: '100%',
            duration: 0.8,
          }
        )
        .fromTo(
          [HomeRef, AboutRef, SwapRef, StakingRef, GamesRef, NFTRef, BtnRef],
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.1 }
        );
    }
  }, [menuState]);

  return (
    <div>
      <div className="py-3 bg-gray-100">
        <div className="px-4 lg:px-20 xl:px-32 text-gray-500 text-sm flex justify-between content-center">
          <span className="flex space-x-2 cursor-pointer text-gray-400 hover:text-pink-400">
            <MdMarkEmailUnread size={25} /> <span>info@succorcoin.com</span>
          </span>
          <span className="flex space-x-2 text-gray-400">
            <FaTelegram
              size={25}
              className="cursor-pointer hover:text-pink-400"
            />
            <FaReddit
              size={25}
              className="cursor-pointer hover:text-pink-400"
            />
            <AiFillTwitterCircle
              size={28}
              className="cursor-pointer hover:text-pink-400"
            />
          </span>
        </div>
      </div>
      {/* Mobile Nav */}
      <nav className="md:hidden bg-white py-4 border-t-2 border-gray-100 shadow px-4">
        <div className="flex justify-between items-center">
          <Image src="/logo.png" width={32} height={32} alt="succorcoin-site" />
          <div>
            <span
              className="text-pink-400 uppercase tracking-wider cursor-pointer border border-pink-400 rounded-lg py-1 px-2"
              onClick={() => onMenuClick()}
              disabled={disabled}
            >
              {menuState.menuText}
            </span>
          </div>
        </div>
        {/* {openMenu && ( */}
        {/* Menu Links */}
        <div ref={(el) => (menuRef = el)} className="hidden">
          <div
            className="flex flex-col justify-center bg-gradient-to-tr from-purple-400 to-pink-400 absolute z-50 top-30 mt-4 left-0 h-full w-full overflow-hidden"
            ref={(el) => (menuWrapperRef = el)}
          >
            <ul className="flex flex-col space-y-8 text-white text-lg font-semibold tracking-widest text-center items-center">
              <li
                ref={(el) => (HomeRef = el)}
                className="cursor-pointer"
                onClick={() =>
                  setMenuState({ clicked: false, menuText: 'menu' })
                }
              >
                Home
              </li>
              <li
                ref={(el) => (AboutRef = el)}
                className="cursor-pointer"
                onClick={() =>
                  setMenuState({ clicked: false, menuText: 'menu' })
                }
              >
                About
              </li>
              <li
                ref={(el) => (SwapRef = el)}
                className="cursor-pointer"
                onClick={() =>
                  setMenuState({ clicked: false, menuText: 'menu' })
                }
              >
                Swap
              </li>
              <li
                ref={(el) => (StakingRef = el)}
                className="cursor-pointer"
                onClick={() =>
                  setMenuState({ clicked: false, menuText: 'menu' })
                }
              >
                Staking
              </li>
              <li
                ref={(el) => (GamesRef = el)}
                className="cursor-pointer"
                onClick={() =>
                  setMenuState({ clicked: false, menuText: 'menu' })
                }
              >
                Games
              </li>

              <li
                ref={(el) => (NFTRef = el)}
                className="cursor-pointer hover:text-gray-100"
                onClick={() => {
                  setDropDownMenu(!dropDownMenu);
                }}
              >
                <span className="flex justify-center items-center space-x-1">
                  <span>NFT</span>{' '}
                  {!dropDownMenu ? <BiChevronDown /> : <BiChevronUp />}
                </span>
                {dropDownMenu && (
                  <ul className="space-y-4 text-white underline duration-200 ">
                    <li
                      className="hover:text-pink-400 hover:underline"
                      onClick={() =>
                        setMenuState({ clicked: false, menuText: 'menu' })
                      }
                    >
                      NFT Minting
                    </li>
                    <li
                      className="hover:text-pink-400 hover:underline"
                      onClick={() =>
                        setMenuState({ clicked: false, menuText: 'menu' })
                      }
                    >
                      NFT Marketplace
                    </li>
                  </ul>
                )}
              </li>
            </ul>
            <button
              ref={(el) => (BtnRef = el)}
              className="bg-transparent border border-white rounded-full mt-8 text-white py-2 px-3 text-lg tracking-widest uppercase hover:scale-105 duration-200 w-6/12 mx-auto"
              onClick={() => setMenuState({ clicked: false, menuText: 'menu' })}
            >
              Join Airdrop
            </button>
          </div>
        </div>
        {/* )} */}
      </nav>
      {/* Large Screen Nav */}
      <nav className="hidden md:block bg-white py-4 border-t-2 border-gray-100 shadow ">
        <div className="md:px-4 lg:px-20 xl:px-32 flex justify-between items-center">
          <Image
            src="/logo-large.png"
            width={150}
            height={35}
            alt="succorcoin-site"
          />
          <div className="flex space-x-12">
            <ul className="flex space-x-10 text-gray-500 text-sm items-center">
              {links.map((link) => {
                return (
                  <li key={link} className="hover:text-pink-400 cursor-pointer">
                    {link}
                  </li>
                );
              })}
              <li
                className="flex space-x-1 items-center cursor-pointer hover:text-pink-400 relative"
                onClick={() => setDropDownMenu(!dropDownMenu)}
              >
                <span>NFT</span> <BiChevronDown />
                {dropDownMenu && (
                  <ul className="absolute top-8 right-0 border border-pink-400 p-4 rounded-md bg-slate-50 space-y-4 w-40 text-gray-400 hover:text-gray-400 duration-200">
                    <li className="hover:text-pink-400 hover:underline">
                      NFT Minting
                    </li>
                    <li className="hover:text-pink-400 hover:underline">
                      NFT Marketplace
                    </li>
                  </ul>
                )}
              </li>
            </ul>
            <button className="bg-pink-400 rounded-full text-white py-2 px-2 text-xs lg:py-2 lg:px-3 lg:text-sm uppercase hover:bg-pink-500 hover:scale-105 duration-200 ">
              Join Airdrop
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
