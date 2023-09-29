import styles from "./HelloUser.module.css";

export default function HelloUser() {
  const user = {
    alias: "jdoe92",
    name: "John Doe",
    organization: "ACME Inc.",
    image:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&q=80",
  };

  return (
    <section className={`${styles.userGreeting}`}>
      <div className={`${styles.imgContainer}`}>
        <img src={user.image} alt={user.name} />
      </div>
      <div>
        <h3>Hi {user.alias} 👋</h3>
        <p>
          You are logged-in as <u>{user.name}</u> from{" "}
          <u>{user.organization}</u>
        </p>
      </div>
    </section>
  );
}
