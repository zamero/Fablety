import { useState, useEffect } from "react"
import axios from "axios"

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(null)
  const [people, setPeople] = useState<
    Array<{
      _id: string
      email: string
      sub: string
      isAdmin: boolean
    }>
  >([])

  useEffect(() => {
    // Make a GET request to check the user's admin status
    console.log(`this is the env: ${import.meta.env.VITE_AWS_LAMBDA}`)
    axios
      .get(
        `${import.meta.env.VITE_AWS_LAMBDA}checkadmin/${localStorage.getItem(
          "userId"
        )}`
      )
      .then((response) => {
        setIsAdmin(response.data.isAdmin)
        if (response.data.isAdmin === true) {
          // If the user is an admin, fetch user data from the backend
          axios
            .get(
              `${
                import.meta.env.VITE_AWS_LAMBDA
              }getallusers/${localStorage.getItem("userId")}`
            )
            .then((usersResponse) => {
              setPeople(usersResponse.data.users)
            })
            .catch((usersError) => {
              console.error("Error fetching user data:", usersError)
            })
        }
      })
      .catch((error) => {
        console.error("Error checking admin status:", error)
      })
  }, [])

  const deleteUser = (userId: string) => {
    axios
      .delete(
        `${import.meta.env.VITE_AWS_LAMBDA}deleteuser/${localStorage.getItem(
          "userId"
        )}/${userId}`
      )
      .then(() => {
        setPeople((prevPeople) =>
          prevPeople.filter((user) => user._id !== userId)
        )
      })
      .catch((error) => {
        console.error("Error deleting user:", error)
      })
  }

  const promoteToAdmin = (userId: string) => {
    axios
      .put(
        `${import.meta.env.VITE_AWS_LAMBDA}promoteadmin/${localStorage.getItem(
          "userId"
        )}/${userId}`
      )
      .then(() => {
        // If the user was promoted to admin successfully, update the isAdmin status in the local state.
        setPeople((prevPeople) =>
          prevPeople.map((user) =>
            user._id === userId ? { ...user, isAdmin: true } : user
          )
        )
      })
      .catch((error) => {
        console.error("Error promoting user to admin:", error)
      })
  }

  return (
    <div>
      {isAdmin === null ? (
        <p>Checking admin status...</p>
      ) : isAdmin === true ? (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        SUB
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Admin
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {people.map((person, personIdx) => (
                      <tr
                        key={person._id}
                        className={
                          personIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {person.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person._id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.sub}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {String(person.isAdmin)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => deleteUser(person._id)}
                          >
                            Delete
                          </button>
                          {person.isAdmin ? (
                            ""
                          ) : (
                            <button
                              className="text-green-600 hover:text-green-900 ml-5"
                              onClick={() => promoteToAdmin(person._id)}
                            >
                              Promote to Admin
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>You do not have admin privileges.</p>
      )}
    </div>
  )
}

export default AdminDashboard
