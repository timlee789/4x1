import React from 'react';
import Image from 'next/image';

export default function CustomItemScreen(props) {
  return (
    <div>
      <div className="flex justify-center card ">
        <div>
          <Image
            src={props.image}
            alt="banner"
            width={300}
            height={450}
            className="element1"
          />
        </div>
      </div>
      <div className="bg-slate-100">
        <div>{props.productname}</div>
        <div className="font-bold text-lg">U$: {props.price}</div>
        <div>{props.description}</div>
        <div className="font-bold">{props.description1}</div>
        <div>{props.description2}</div>
      </div>
      {/* <div>{props.user}</div> */}
    </div>
  );
}
