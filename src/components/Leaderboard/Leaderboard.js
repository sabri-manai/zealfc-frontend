import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ leaderboardData }) => {
  return (
    <div className="leaderboard-container">
      {/* Leaderboard Ranking */}
      <div className="ranking">
        {leaderboardData.map((user, index) => (
          <div key={user.id} className={`ranking-item ${index === 0 ? 'first-place' : ''}`}>
            <span className="rank">{index + 1}.</span>
            <img src={user.profilePicture} alt={`${user.name}'s avatar`} className="avatar" />
            <span className="name">{user.name}</span>
            <span className="points">{user.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;


// // src/components/Leaderboard/Leaderboard.js

// import React from 'react';
// import './Leaderboard.css';

// const Leaderboard = ({ leaderboardData }) => {
//   return (
//     <div className="leaderboard-container">
//       {leaderboardData.map((player, index) => (
//         <div key={player.id || index} className="leaderboard-item">
//           <img src={player.profilePictureUrl} alt={`${player.name}'s profile`} className="leaderboard-profile-pic" />
//           <div className="leaderboard-info">
//             <h3>{player.name}</h3>
//             <p>{player.points} points</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Leaderboard;
