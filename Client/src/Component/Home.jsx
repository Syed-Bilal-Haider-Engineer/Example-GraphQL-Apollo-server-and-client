import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

const CREATE_USER_MUTATION = gql`
mutation CreateUser($input: any) {
    createUser(input: { name: "John", username: "john_doe", age: 25, nationality: US }) {
        id
        name
        age
        username
        nationality
      }
  }
  
`;

function Home() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");
  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
  const [createUser,{error}] = useMutation(CREATE_USER_MUTATION);
  console.log("createUser===>",createUser);
  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };
//   console.log("data========>",data);
const createUserAndRefetch = async () => {
    try {
      await createUser({
        variables: {
          input: { name, username, age: Number(age), nationality },
        },
      });
    } catch (error) {
      console.error("Mutation error:", error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => handleInputChange(event, setName)}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => handleInputChange(event, setUsername)}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => handleInputChange(event, setAge)}
        />
        <input
          type="text"
          placeholder="Nationality..."
          onChange={(event) =>
            handleInputChange(event, (value) =>
              setNationality(value.toUpperCase())
            )
          }
        />
        <button onClick={createUserAndRefetch}>Create User</button>
      </div>
      {!loading && (
        <div>
          {data &&
            data.users.map((user) => (
              <div key={user.id}>
                <h1>Name: {user.name}</h1>
                <h1>Username: {user.username}</h1>
                <h1>Age: {user.age}</h1>
                <h1>Nationality: {user.nationality}</h1>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Home;
