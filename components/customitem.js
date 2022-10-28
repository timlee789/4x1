import React from 'react';
import Image from 'next/image';

export default function CustomItemScreen(props) {
  return (
    <div>
      <div className="flex justify-center ">
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
      <div>{props.productname}</div>
      <div>{props.price}</div>
      <div>{props.description1}</div>
      <div>{props.user}</div>
    </div>
  );
}
