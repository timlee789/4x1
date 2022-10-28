import axios from 'axios';
import React, { useEffect, useReducer } from 'react';

import Layout from '../components/layout';
import { getError } from '../utils/error';
import Image from 'next/image';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, campaigns: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function CampaignHistoryScreen() {
  const [{ loading, error, campaigns }, dispatch] = useReducer(reducer, {
    loading: true,
    campaigns: [],
    error: '',
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/product/producthistory`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);

  const editHandler = () => {};
  return (
    <Layout title="Order History">
      <h1 className="mb-4 text-xl">Product List</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr className="px-5 text-left text-lg text-bold bg-slate-200">
                <td className="p-5 ">Product Name</td>
                <td className="p-5 text-left">Price</td>
                <td className="p-5 text-left">Description</td>
                <td className="p-5 text-left">Description1</td>
                <td className="p-5 text-left">Description2</td>
                <td className="p-5 text-left">Product Image</td>
              </tr>
            </thead>

            <tbody>
              {campaigns.map((subcam) => (
                <tr key={subcam._id} className="border-b text-lg ">
                  <td className="p-5 ">{subcam.productname}</td>
                  <td className=" p-5 ">{subcam.price}</td>
                  <td className=" p-5 ">{subcam.description}</td>
                  <td className=" p-5 ">{subcam.description1}</td>
                  <td className=" p-5 ">{subcam.description2}</td>

                  <td className=" p-5 ">
                    <Image
                      src={subcam.image}
                      alt={subcam.productname}
                      width={100}
                      height={100}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}
CampaignHistoryScreen.auth = true;
