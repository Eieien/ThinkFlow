import { useState } from "react";
import ian from "@/assets/images/Ian.jpg";

export default function Account() {
  // USER DATA
  const [username, setUsername] = useState("Ian Florentino");
  const [nickname, setNickname] = useState("Pedophile");
  const [email, setEmail] = useState("JohnDoe@gmail.com");

  // EDIT STATES
  const [editUsername, setEditUsername] = useState(false);
  const [editNickname, setEditNickname] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  // PASSWORD STATES
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <h3 className="text-primary-dark text-xl font-bold dark:text-primary-white mb-6">
        Account
      </h3>

      {/* PROFILE SECTION */}
      <div className="flex gap-10 w-2xl">
        <img
          className="min-w-35 h-35 object-cover rounded-full"
          src={ian}
          alt="Profile"
        />

        <div className="w-full">

          {/* USERNAME */}
          <div className="h-18">
            <div className="flex justify-between items-center pb-2">
              <h3 className="text-primary-dark text-xl font-bold dark:text-primary-white">
                Username
              </h3>

              {!editUsername ? (
                <button
                  onClick={() => setEditUsername(true)}
                  className="px-4 border border-primary-dark dark:border-primary-white rounded-md cursor-pointer"
                >
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditUsername(false)}
                    className="px-4 border border-primary-dark dark:border-primary-white rounded-md cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setEditUsername(false)}
                    className="px-4 bg-primary-dark text-white dark:bg-primary-white dark:text-primary-dark rounded-md cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {!editUsername ? (
              <p className="h-10 text-dark-3 text-base dark:text-gray-400">{username}</p>
            ) : (
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-10 w-full p-2 border rounded-md"
              />
            )}
          </div>

          {/* NICKNAME */}
          <div className="h-23 pt-2">
            <div className="flex justify-between items-center pb-2">
              <h3 className="text-primary-dark text-xl font-bold dark:text-primary-white">
                Nickname
              </h3>

              {!editNickname ? (
                <button
                  onClick={() => setEditNickname(true)}
                  className="px-4 border border-primary-dark dark:border-primary-white rounded-md cursor-pointer"
                >
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditNickname(false)}
                    className="px-4 border border-primary-dark dark:border-primary-white rounded-md cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setEditNickname(false)}
                    className="px-4 bg-primary-dark text-white dark:bg-primary-white dark:text-primary-dark rounded-md cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {!editNickname ? (
              <p className="h-10 text-dark-3 text-base dark:text-gray-400">{nickname}</p>
            ) : (
              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="h-10 w-full p-2 border rounded-md"
              />
            )}
          </div>
        </div>
      </div>

      {/* EMAIL & PASSWORD */}
      <div className="w-2xl border-b border-primary-dark dark:border-primary-white pb-4">

        {/* EMAIL */}
        <div className="h-18">
          <div className="flex justify-between items-center pb-2">
            <h3 className="text-primary-dark text-xl font-bold dark:text-primary-white">
              Email
            </h3>

            {!editEmail ? (
              <button
                onClick={() => setEditEmail(true)}
                className="px-4 border border-primary-dark dark:border-primary-white rounded-md cursor-pointer"
              >
                Change Email
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditEmail(false)}
                  className="px-4 border border-primary-dark dark:border-primary-white rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setEditEmail(false)}
                  className="px-4 bg-primary-dark text-white dark:bg-primary-white dark:text-primary-dark rounded-md cursor-pointer"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {!editEmail ? (
            <p className="text-dark-3 text-base dark:text-gray-400">{email}</p>
          ) : (
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          )}
        </div>

        {/* PASSWORD */}
        <div className="pt-2">
          <div className="flex justify-between items-center pb-2">
            <h3 className="text-primary-dark text-xl font-bold dark:text-primary-white">
              Password
            </h3>

            {!changePassword && (
              <button
                onClick={() => setChangePassword(true)}
                className="px-4 border border-primary-dark dark:border-primary-white rounded-md cursor-pointer"
              >
                Change Password
              </button>
            )}
          </div>

          {!changePassword ? (
            <p className="text-dark-3 text-base dark:text-gray-400">
              Change your password to secure your account
            </p>
          ) : (
            <div className="flex flex-col gap-3 mt-3">
              <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="p-2 border rounded-md"
              />
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-2 border rounded-md"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-2 border rounded-md"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setChangePassword(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  className="px-4 border border-primary-dark dark:border-primary-white rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (newPassword !== confirmPassword) {
                      alert("Passwords do not match!");
                      return;
                    }
                    alert("Password updated (frontend only)");
                    setChangePassword(false);
                  }}
                  className="px-4 bg-primary-dark text-white dark:bg-primary-white dark:text-primary-dark rounded-md cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
