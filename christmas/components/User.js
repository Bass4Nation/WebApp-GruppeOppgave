/* eslint-disable no-ternary */

import { useRouter } from 'next/router'
import { useUser } from '@/hooks/useUser'
import { makeAdmin, removeAdmin } from '@/lib/utils/user'

const User = () => {
  const { user, admin, users, setSelectedUser } = useUser()
  const router = useRouter()

  const removeUserAsAdmin = () => {
    removeAdmin()
    router.reload()
  }

  const setUserAsAdmin = () => {
    makeAdmin()
    router.reload()
  }

  const handleSelectUser = async (event) => {
    const selectedUser = users.find(
      (_user) => _user.username === event.target.value
    )

    if (selectedUser) {
      const { id, username } = selectedUser

      setSelectedUser(JSON.stringify({ id, username }))
      router.reload()
    }
  }

  return (
    <div id="userContainer">
      <div>
        {admin ? null : users?.length > 0 ? (
          <select onChange={handleSelectUser} value={user?.username}>
            <option value="" disabled>
              Velg bruker
            </option>
            {users.map(({ id, username }) => (
              <option key={id} value={username}>
                {username}
              </option>
            ))}
          </select>
        ) : null}
      </div>

      {admin ? (
        <>
          <span>Du er sjefen</span>{' '}
          <button type="button" onClick={removeUserAsAdmin}>
            Fjern meg som admin
          </button>
        </>
      ) : (
        <div>
          <button type="button" onClick={setUserAsAdmin}>
            Gjør til admin
          </button>
        </div>
      )}

      {admin ? (
        <>
          <button type="button" onClick={() => router.push('/dashboard')}>
            Gå til dashboard
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => alert('Du har ikke tilgang til å se dette innholdet')}
        >
          Gå til dashboard
        </button>
      )}
    </div>
  )
}

export default User
