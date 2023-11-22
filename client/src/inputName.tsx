import { Input } from "./components/ui/modifiedInput";
import { Button } from "./components/ui/button";
import { useState, useEffect } from "react";
import clsx from "clsx";
import axios from "axios";

const InputName = () => {
  const [landingAnimationDone, setlandingAnimationDone] = useState(true);
  const [toggleError, setToggleError] = useState(false);
  const [inputPlaceHolder, setInputPlaceHolder] = useState(
    "shubh naam of the person"
  );
  const [username, setUsername] = useState("");
  const [modifiedName, setModifiedName] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [showModifiedName, setShowModifiedName] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const inputClasses = clsx(
    // general
    "justify-centre flex h-[6.5vh] w-96 items-center rounded-xl border border-b-0 border-black font-mono text-xl font-bold text-black shadow-[0px_4.5px_0px_0px_black] outline-none transition-all duration-200 ease-in-out will-change-transform bg-slate-300",

    // focus
    {
      "focus:translate-y-[-1px] focus:shadow-[-2px_5.5px_0px_0px_black] focus:ease-linear":
        !landingAnimationDone,
    },

    // active
    {
      "active:translate-y-[2px] active:shadow-[0px_3.5px_0px_0px_black] active:duration-100":
        !landingAnimationDone,
    },

    {
      // landing animation
      "animate-fade-up animate-delay-[500ms] animate-duration-[1500ms] animate-once":
        landingAnimationDone,
    },

    {
      // error toggling
      " animate-shake animate-duration-[200ms]": toggleError,
    }
  );

  const buttonClasses = clsx(
    // general
    "group flex h-[6.5vh] items-center justify-center rounded-xl border border-b-0 border-black font-mono text-xl font-semibold text-black shadow-[0px_4.5px_0px_0px_black] transition-all duration-300 ease-in-out will-change-transform bg-slate-300",

    // hover
    {
      "hover:-translate-y-[2px] hover:shadow-[-2px_5.5px_0px_0px_black] hover:bg-slate-300":
        !landingAnimationDone,
    },

    // active
    {
      "active:translate-y-[2px] active:shadow-[-1.5px_3.5px_0px_0px_black] active:duration-100 active:bg-slate-300":
        !landingAnimationDone,
    },

    // landing animation
    {
      "animate-fade-up animate-delay-[800ms] animate-duration-[1500ms] animate-once":
        landingAnimationDone,
    }
  );

  const modifiedNameClasses = clsx(
    // general
    "justify-centre flex items-center rounded-xl border border-b-0 border-black font-mono text-5xl font-bold text-black shadow-[0px_4.5px_0px_0px_black] outline-none transition-all duration-200 ease-in-out will-change-transform p-5 bg-slate-300",

    // focus
    {
      "hover:translate-y-[-3px] hover:shadow-[0px_7.5px_0px_0px_black] hover:ease-linear":
        !landingAnimationDone,
    },

    // // active
    // {
    //   "active:translate-y-[2px] active:shadow-[0px_3.5px_0px_0px_black] active:duration-100":
    //     !landingAnimationDone,
    // },

    // landing animation
    {
      "animate-jump-in animate-delay-[500ms] animate-duration-[400ms] animate-once animate-ease-linear animate-alternate":
        landingAnimationDone,
    }
  );

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  const handleKeyInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!username.trim()) {
      setToggleError(true);
    } else if (e.key == "Enter") {
      setIsButtonClicked(true);
    }
  };

  useEffect(() => {
    if (!isButtonClicked) return;
    setShowModifiedName(true);
    setLoading(true);
    axios
      .get(`https://galli-giver-backend.vercel.app/galli?name=${username}`)
      .catch((error) => {
        console.log(error);
      })
      .then((response) => {
        if (response) {
          // console.log(response.data);
          console.log(response.data.modifiedName);
          const timer = setTimeout(() => {
            setLoading(false);
            setlandingAnimationDone(true);
          }, 1000);
          setModifiedName(response.data.modifiedName);
          return () => clearTimeout(timer);
        }
      })
      .finally(() => {});
    setIsButtonClicked(false);
  }, [isButtonClicked]);

  useEffect(() => {
    if (toggleError) {
      setInputPlaceHolder("shubh naam of the person ... (!)");
      const timer = setTimeout(() => {
        setToggleError(false);
      }, 201);
      return () => clearTimeout(timer);
    }
  }, [toggleError]);

  useEffect(() => {
    if (!landingAnimationDone) return;
    const timeout = setTimeout(() => {
      setlandingAnimationDone(false);
    }, 2101);
    return () => clearTimeout(timeout);
  }, [landingAnimationDone]);

  return (
    <div className="text-4xl h-screen w-screen flex justify-center items-center bg-slate-300 font-mono bg-polka-dot-pattern z-10">
      {showModifiedName ? (
        loading ? (
          <div className={modifiedNameClasses}>
            preparing galli &nbsp;( ︶︿︶)_╭∩╮
          </div>
        ) : (
          <>
            <div className="flex-col justify-center items-center gap-2">
              <div className={modifiedNameClasses}>
                {modifiedName} &nbsp;╭∩╮ʕ•ᴥ•ʔ╭∩╮
              </div>
              <div className="flex justify-center my-5">
                {" "}
                <Button
                  className={buttonClasses}
                  onClick={() => {
                    handleButtonClick();
                  }}
                  disabled={landingAnimationDone}
                >
                  aur khani hai
                  <div className="ml-2 scale-150">
                    <svg
                      className="stroke-black stroke-2"
                      fill="none"
                      width="18"
                      height="10"
                      viewBox="0 0 10 10"
                      aria-hidden="true"
                    >
                      <path
                        className="opacity-0 transition duration-300 group-hover:opacity-100"
                        d="M0 5h7"
                      ></path>
                      <path
                        className="transition duration-200 group-hover:translate-x-[7.2px]"
                        d="M1 1l4 4-4 4"
                      ></path>
                    </svg>
                  </div>
                </Button>
              </div>
            </div>
          </>
        )
      ) : (
        <div className="flex gap-2">
          <Input
            className={inputClasses}
            placeholder={inputPlaceHolder}
            onChange={updateUserName}
            value={username}
            onKeyUp={(e: React.KeyboardEvent<HTMLDivElement>) => {
              handleKeyInput(e);
            }}
            disabled={landingAnimationDone}
          />
          <Button
            className={buttonClasses}
            onClick={() => {
              if (!username.trim()) {
                setToggleError(true);
              } else {
                handleButtonClick();
              }
            }}
            disabled={landingAnimationDone}
          >
            gaali khao
            <div className="ml-2 scale-150">
              <svg
                className="stroke-black stroke-2"
                fill="none"
                width="18"
                height="10"
                viewBox="0 0 10 10"
                aria-hidden="true"
              >
                <path
                  className="opacity-0 transition duration-300 group-hover:opacity-100"
                  d="M0 5h7"
                ></path>
                <path
                  className="transition duration-200 group-hover:translate-x-[7.2px]"
                  d="M1 1l4 4-4 4"
                ></path>
              </svg>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default InputName;
