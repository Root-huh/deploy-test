import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  const [currentTab, setCurrentTab] = useState(TAB_LIST[0].key);
  const containerRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.pageYOffset;
      const container = containerRef.current;
      if (scrollY >= META_HEIGHT) {
        window.scrollTo(0, META_HEIGHT);
        !container.classList.contains(CONTAINER_FIXED_CLASSNAME) &&
          container.classList.add(CONTAINER_FIXED_CLASSNAME);
      } else {
        container.classList.contains(CONTAINER_FIXED_CLASSNAME) &&
          container.classList.remove(CONTAINER_FIXED_CLASSNAME);
      }
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const freezeAllSlides = useCallback(() => {
    swiperRef.current.slides.forEach(slide => {
      slide.style.overflowY = "hidden";
    });
  }, []);
  const unFreezeAllSlides = useCallback(() => {
    swiperRef.current.slides.forEach((slide, index) => {
      index === swiperRef.current.activeIndex &&
        (slide.style.overflowY = "auto");
    });
  }, []);

  return (
    <div id="root">
      <header>Header</header>
      <div id="meta" />
      <div id="container" ref={containerRef}>
        <div id="tabs">
          {TAB_LIST.map(({ key, text }, index) => (
            <div
              key={key}
              className={currentTab === key && "active"}
              onClick={() => {
                setCurrentTab(key);
                freezeAllSlides();
                swiperRef.current.slideTo(index);
              }}
            >
              {text}
            </div>
          ))}
        </div>
        <div id="tab-content">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            initialSlide={getTabIndex(currentTab)}
            onSlideChange={swiper => {
              setCurrentTab(TAB_LIST[swiper.activeIndex].key);
              swiperRef.current = swiper;
            }}
            onSwiper={swiper => {
              swiperRef.current = swiper;
            }}
            onTouchStart={() => {
              freezeAllSlides();
            }}
            onSlideChangeTransitionEnd={() => {
              unFreezeAllSlides();
            }}
          >
            {TAB_LIST.map(({ key, text }, _index) => (
              <SwiperSlide key={key}>
                {Array.from({ length: TAB_LENGTH_LIST[_index] }).map(
                  (_, index) => (
                    <p key={index}>
                      This is {text} #{index}
                    </p>
                  )
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <style jsx global>{`
        * {
          margin: 0 auto;
          padding: 0;
        }

        html,
        body {
          height: 100%;
          position: relative;
        }

        body > div,
        #root {
          height: 100%;
        }

        .swiper-container {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .swiper-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          z-index: 1;
        }

        .swiper-slide {
          width: 100%;
          height: 100%;
          position: relative;
          flex-shrink: 0;
        }

        .${CONTAINER_FIXED_CLASSNAME} .swiper-slide {
          overflow-x: hidden;
          overflow-y: auto;
        }
      `}</style>
      <style jsx>{`
        header {
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background-color: #444;
          color: white;
          top: 0;
        }

        #meta {
          height: ${META_HEIGHT}px;
          background-color: black;
          top: ${HEADER_HEIGHT}px;
        }

        header,
        #meta {
          width: 100%;
          position: fixed;
          left: 0;
        }

        #container {
          position: relative;
          top: ${HEADER_HEIGHT + META_HEIGHT}px;
          background-color: white;
          height: 100%;
        }

        #tabs {
          display: flex;
          height: ${TAB_HEIGHT}px;
        }
        #tabs > div {
          flex: auto;
          display: flex;
          cursor: pointer;
          align-items: center;
          background-color: #f5f5f5;
          padding: 0 8px;
        }
        #tabs > div.active {
          background-color: white;
        }

        #tab-content {
          height: calc(100% - ${META_HEIGHT - HEADER_HEIGHT - TAB_HEIGHT}px);
        }
      `}</style>
    </div>
  );
}

const HEADER_HEIGHT = 50;
const META_HEIGHT = 240;
const TAB_HEIGHT = 50;
const CONTAINER_FIXED_CLASSNAME = "container-fixed";

const TAB_LIST = [
  {
    key: "tab-1",
    text: "Tab1",
  },
  {
    key: "tab-2",
    text: "Tab2",
  },
  {
    key: "tab-3",
    text: "Tab3",
  },
];
const TAB_LENGTH_LIST = [100, 50, 200];

function getTabIndex(key) {
  return TAB_LIST.findIndex(item => item.key === key);
}

function getScrollTopList(elements) {
  const arr = [];
  elements.forEach(element => {
    arr.push(element.scrollTop);
  });
  return arr;
}
