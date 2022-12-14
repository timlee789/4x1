import React, { useState } from 'react';
import db from '../../utils/db';
import CustomItemScreen from '../../components/customitem';
import HomePage from '../homepage';
import Layout from '../../components/layout';
import Product from '../../models/Product';
import User from '../../models/Users';
import HeadBanner from '../../components/headbanner';

function StoreScreen({ store, head }) {
  console.log(head);

  return (
    <Layout>
      <div>
        {head.map((heads) => (
          <HeadBanner key={heads._id} img1={heads.img1} />
        ))}

        <div className="lg:justify-center mt-4">
          <div>
            <div>
              <div className=" grid grid-cols-1 p-5 gap-5 md:grid-cols-4 ">
                {store.map((sto) => (
                  <CustomItemScreen
                    key={sto._id}
                    productname={sto.productname}
                    price={sto.price}
                    image={sto.image}
                    description1={sto.description1}
                    user={sto.user}
                  />
                ))}
              </div>
              <HomePage />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  console.log(id);
  await db.connect();
  const store = await Product.find({ user: id });
  const userhead = await User.find({ _id: id });
  //.populate('product');
  await db.disconnect();
  return {
    props: {
      store: JSON.parse(JSON.stringify(store)),
      head: JSON.parse(JSON.stringify(userhead)),
    },
  };
}
export default StoreScreen;
