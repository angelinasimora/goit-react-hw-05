import styles from "./EmptyState.module.css";

function EmptyState({ onFeelingLucky }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.noMovies}>No movies</p>
      <p className={styles.text}>
        Start typing a movie title above to discover something great 🍿
      </p>
      <button onClick={onFeelingLucky} className={styles.button}>
        🎲 I'm Feeling Lucky
      </button>
      <blockquote className={styles.quote}>
        “Why so serious?” <cite>– The Dark Knight</cite>
      </blockquote>
    </div>
  );
}

export default EmptyState;
