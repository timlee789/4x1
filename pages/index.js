import db from '../utils/db';
import StoreInfo from '../components/storeinfo';
import Layout from '../components/layout';
import User from '../models/Users';

export default function Home({ storeinfo }) {
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 mt-20 md:grid-cols-3 lg:grid-cols-5 ml-7 ">
        {storeinfo.map((sto) => (
          <StoreInfo
            key={sto._id}
            id={sto._id}
            img1={sto.img1}
            url={sto.url}
            state={sto.state}
            storename={sto.storename}
            city={sto.city}
          />
        ))}
      </div>
    </Layout>
  );
}
export async function getServerSideProps() {
  await db.connect();
  const stores = await User.find().sort({ state: 1 }).lean();
  return {
    props: {
      storeinfo: stores.map((sto) => ({
        _id: sto._id.toString(),
        storename: sto.storename || null,
        city: sto.city || null,
        state: sto.state || null,
        url: sto.url || null,
        img1: sto.img1 || null,
      })),
    },
  };
}
