import React, { useEffect } from 'react';

interface Step4Props {
  formData: any;
  recommendedClubs: [string, number, number, string][]; // Includes profile picture URL
  toggleFollowing: (club: string) => void;
}

const Step4: React.FC<Step4Props> = ({ formData, recommendedClubs, toggleFollowing }) => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter clubs to show only those with matches
  const filteredClubs = recommendedClubs.filter(([_, matchScore]) => matchScore > 0);

  // Debugging: Log the filtered recommended clubs
  console.log('Filtered Clubs for Step 4:', filteredClubs);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Recommended Clubs and Organizations</h2>
      {filteredClubs.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {filteredClubs.map(([clubName, matchScore, followers, profilePic]) => (
            <div key={clubName} className="flex items-center space-x-4 p-4 border rounded-md shadow-md">
              {/* Profile picture */}
              <img
                src={`/api/proxyImage?url=${encodeURIComponent(profilePic)}`}
                alt={`${clubName} profile`}
                className="w-16 h-16 rounded-full object-cover"
                onError={(e) => (e.currentTarget.src = '/default-profile.png')} // Fallback to a default profile picture
              />
              <div>
                {/* Club details */}
                <h3 className="text-lg font-semibold">{clubName}</h3>
                <p className="text-sm text-gray-500">
                  Match: {matchScore} | Followers: {followers.toLocaleString()}
                </p>
                {/* Follow/Unfollow button */}
                <button
                  type="button"
                  className={`mt-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    formData.following.includes(clubName)
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => toggleFollowing(clubName)}
                >
                  {formData.following.includes(clubName) ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No recommendations available.</p>
      )}
    </>
  );
};

export default Step4;
