import useSWR from "swr";

function fetcher (url) {
  return fetch(url).then(res => res.json())
}


export default function IndexPage () {
  const { data } = useSWR(`https://swapi.dev/api/people/1`, fetcher)
  return (
    <div>{data?.name}...</div>
  )
}