
export const Card = ({ children }) => {
  return <div className="border rounded-lg shadow-md p-4">{children}</div>;
};

export const CardHeader = ({ children }) => {
  return <div className="border-b pb-2 mb-2">{children}</div>;
};

export const CardTitle = ({ children }) => {
  return <h2 className="text-lg font-bold">{children}</h2>;
};

export const CardContent = ({ children }) => {
  return <div>{children}</div>;
};
