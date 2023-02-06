import { useQuery } from "react-query";

type userData = {
  address: {
    geolocation: {
      lat: string;
      long: string;
    };
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
  __v: number;
};

export default function useGetAllUsersData(): userData[] {
  async function getAllUsersData() {
    const data = await fetch("https://fakestoreapi.com/users").then((res) => res.json());
    return data;
  }

  const { data } = useQuery("AllUsersData", getAllUsersData, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity
  });

  return data;
}
