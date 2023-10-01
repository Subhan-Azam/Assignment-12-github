'use client';
import { useState } from 'react';

export default function Home() {
  const [userName, setUserName] = useState("");
  const [data, setData] = useState(null);
  const [followers, setFollowers] = useState([]);

  const onChangeHandler = async (e) => {
    setUserName(e.target.value)
  }

  const onClickHandler = async () => {
    setFollowers([])
    let response = await fetch(`https://api.github.com/users/${userName}`)
    response = await response.json()
    setData(response)
    console.log(response);
  }

  const getFollowers = async () => {
    let response = await fetch(data.followers_url);
    response = await response.json();
    setFollowers(response)
  }

  return (
    <div className='bg-blue-400 min-h-[300px] py-5'>
      <div className='flex justify-center items-center flex-wrap py-7 space-x-3 space-y-3'>
        <label htmlFor="userName">Enter User Name:</label>
        <input onChange={onChangeHandler} type="text" placeholder="Enter Name..." />
        <button onClick={onClickHandler}>Search</button>
      </div>

      {data &&
        <div className='userData px-3'>
          <h1 className='text-5xl underline mb-3'>Github User</h1>

          <p className='text-blue-900 text-lg'><span>Bio:</span>{data.bio}</p>
          <img className='rounded-3xl py-2' src={data.avatar_url} width={100} alt="" />
          <p className='text-blue-900 text-lg'><span>Followers:</span> {data.followers}</p>
          <button onClick={getFollowers}>Get Followers</button>
        </div>
      }


      {followers.length >= 1 &&
        <table className='flex justify-center items-center flex-col'>
          <tr>
            <th>id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Type</th>
          </tr>

          {followers.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td><img width={100} src={item.avatar_url} alt="" /></td>
                <td>{item.login}</td>
                <td>{item.type}</td>
              </tr>
            )
          })}
        </table>
      }

    </div>
  )
}