function TopicInput({ topic, setTopic }) {
  return (
    <div className="card">
      <h2>What do you want to learn?</h2>

      <input
        type="text"
        placeholder="Example: Machine Learning"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
    </div>
  );
}

export default TopicInput;
