type AdminConsoleProperties = {
  id: string;
};

const AdminConsole = ({ id }: AdminConsoleProperties) => {
  return (
    <div>
      <h1> Admin Console </h1>
      <p>{id}</p>
    </div>
  );
};

export { AdminConsole };
