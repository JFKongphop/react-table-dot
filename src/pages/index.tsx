import { useEffect, useRef, useState } from 'react'

const index = () => {
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [position, setPosition] = useState<[number, number]>([0, 0])/*[X, Y]*/
  const innerSide = useRef<any>(null)

  useEffect(() => {
    if (innerSide.current) {
      setHeight(innerSide.current.clientHeight)
      setWidth(innerSide.current.clientWidth)
    }
  }, [])

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      switch (event.key) {
        // - Y
        case 'ArrowUp':
          return setPosition((prevPosition) => [
            /* X */ prevPosition[0], 
            /* Y */ prevPosition[1] - 16
          ])
        // - X
        case 'ArrowLeft':
          return setPosition((prevPosition) => [
            /* X */ prevPosition[0] - 16, 
            /* Y */ prevPosition[1]
          ])
        // + X
        case 'ArrowRight':
          return setPosition((prevPosition) => [
            /* X */ prevPosition[0] + 16, 
            /* Y */ prevPosition[1]
          ])
        // + Y
        case 'ArrowDown':
          return setPosition((prevPosition) => [
            /* X */ prevPosition[0], 
            /* Y */ prevPosition[1] + 16
          ])
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  useEffect(() => {
    if (position[0] < 0) {
      return setPosition((prevPosition) => [
        /* X */ 0, 
        /* Y */ prevPosition[1]
      ])
    }
    if (position[0] > width) {
      return setPosition((prevPosition) => [
        /* X */ width - 16, 
        /* Y */ prevPosition[1]
      ])
    }
    if (position[1] < 0) {
      return setPosition((prevPosition) => [
        /* X */ prevPosition[0], 
        /* Y */ 0
      ])
    }
    if (position[1] > height) {
      return setPosition((prevPosition) => [
        /* X */ prevPosition[0], 
        /* Y */ height - 16
      ])
    }
  }, [position])
  
  return (
    <div
      ref={innerSide} 
      className="bg-black h-screen w-screen text-white"
    >
      <div
        style={{
          top: `${position[1]}px`,
          left: `${position[0]}px`
        }}
        className="w-4 h-4 bg-red-500 rounded-full absolute z-10"
      />
      {
        Array.from({ length: (height) / 16 }).map((_, index) => (
          <div
            key={index}
            style={{
              top: `${index * 16}px`
            }} 
            className="border-0 border-b border-white w-full absolute"
          />
        ))
      }
      <div className="flex flew-row gap-4 h-screen">
        {
          Array.from({ length: (width - 112) / 16 }).map((_, index) => (
            <div
              key={index}
              className="border-0 border-r border-white w-4 h-full"
            />
          ))
        }
      </div>
    </div>
  )
}

export default index;