function Difficulty({ difficulty, setDifficulty }) {
  return (
    <div className="card">
      <h2>Select Difficulty</h2>

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}

export default Difficulty;
