import Header from '../components/Header';
import Footer from '../components/Footer';

import { format } from 'date-fns';
import { useRouter } from 'next/dist/client/router';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';

const Search = ({ searchResult }) => {
  const router = useRouter();

  const { location, startDate, endDate, numOfGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), 'dd MMMM yy');
  const formattedEndDate = format(new Date(endDate), 'dd MMMM yy');

  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${numOfGuests} Guests`} />

      <main className='flex'>
        <section className='flex-grow pt-14 px-6'>
          <p className='text-xs'>
            300+ Stays - {range} - for {numOfGuests} guests
          </p>
          <h1 className='text-3xl font-semibold mt-2 mb-6'>
            Stays in {location}
          </h1>
          <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
            <p className='button'>Cancellation Flexibility</p>
            <p className='button'>Type of place</p>
            <p className='button'>Price</p>
            <p className='button'>Rooms and beds</p>
            <p className='button'>More Filters</p>
          </div>

          <div className='flex flex-col'>
            {searchResult?.map((item) => (
              <InfoCard
                img={item.img}
                location={item.location}
                description={item.description}
                title={item.title}
                price={item.price}
                star={item.star}
                total={item.total}
                key={item.img}
              />
            ))}
          </div>
        </section>

        <section className='hidden xl:inline-flex'>
          <Map />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;

export async function getServerSideProps() {
  const searchResult = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json()
  );

  return {
    props: {
      searchResult,
    },
  };
}
