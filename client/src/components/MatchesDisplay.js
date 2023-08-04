import axios from "axios";
import { useEffect, useState } from "react";

const MatchesDisplay = ({ matches, setClickedUser }) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);

  // make array from object with the matches user IDs
  const matchedUserIds = matches.map(({ user_id }) => user_id);

  const getMatches = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/users",
        {
          // stringify the array of user IDs, because the backend expects a string
          params: { userIds: JSON.stringify(matchedUserIds) },
        }
      );
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatches();
  }, []);

  console.log("matchedProfiles:", matchedProfiles);

  return (
    <div className="matches-display">
      {matchedProfiles?.map((match, _index) => (
        <div
          key={{ _index }}
          className={"match-card"}
          onClick={setClickedUser(match)}
        >
          <div className="img-container">
            <img src={match?.url} alt={match?.first_name + " profile"} />
          </div>
          <h3>{match?.first_name}</h3>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;
