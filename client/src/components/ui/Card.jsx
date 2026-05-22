import clsx from 'clsx';

export const Card = ({ className, children, ...props }) => {
  return (
    <div className={clsx("rounded-2xl border border-border bg-card text-card-foreground shadow-sm", className)} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }) => {
  return (
    <div className={clsx("flex flex-col space-y-1.5 p-6", className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3 className={clsx("font-semibold leading-none tracking-tight", className)} {...props}>
      {children}
    </h3>
  );
};

export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={clsx("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
};
