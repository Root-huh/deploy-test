import { useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  const [currentTab, setCurrentTab] = useState(TAB_LIST[0].key);
  const containerRef = useRef(null);
  const swiperRef = useRef(null);
  const isSliding = useRef(false);

  const freezeAllSlides = useCallback(() => {
    swiperRef.current &&
      swiperRef.current.slides.forEach(slide => {
        slide.style.overflowY = "hidden";
      });
  }, []);
  const unFreezeActiveSlide = useCallback(() => {
    swiperRef.current &&
      swiperRef.current.slides.forEach((slide, index) => {
        index === swiperRef.current.activeIndex &&
          (slide.style.overflowY = "auto");
      });
  }, []);

  return (
    <div id="root">
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
            onSwiper={swiper => {
              swiperRef.current = swiper;
            }}
            onSliderMove={swiper => {
              // isSliding: 돔 접근 코드 반복 수행 방지
              // translate: 실제 움직임이 있었는지 확인하기 위함.
              //  (움직임이 없으면 onTransitionEnd, onSlideChangeTransitionEnd 이벤트가 동작하지 않음)
              !isSliding.current &&
                Math.abs(swiper.translate) !==
                  Math.abs(swiper.slidesGrid[swiper.activeIndex]) &&
                freezeAllSlides();
              isSliding.current = true;
            }}
            onSlideChangeTransitionEnd={() => {
              unFreezeActiveSlide();
              isSliding.current = false;
            }}
            onTransitionEnd={() => {
              isSliding.current && unFreezeActiveSlide();
              isSliding.current = false;
            }}
            onSlideChange={swiper => {
              setCurrentTab(TAB_LIST[swiper.activeIndex].key);
              swiperRef.current = swiper;
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
          overflow-x: hidden;
          overflow-y: auto;
        }
      `}</style>
      <style jsx>{`
        #container {
          position: relative;
          top: 0;
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
          height: calc(100% - ${TAB_HEIGHT}px);
        }
      `}</style>
    </div>
  );
}

const TAB_HEIGHT = 50;
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
