import { Card, CardContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AppState } from '@/store/store';
import { useSelector } from '@/store/hooks';

type Props = {
  title?: string;
  className?: string;
  children: JSX.Element | JSX.Element[];
  sx?: any;
};

const DashboardCard = ({ title, children, className, sx }: Props) => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return (
    <Card
      sx={{
        p: 0,
        border: !customizer.isCardShadow ? `1px solid ${borderColor}` : 'none',
        position: 'relative',
        height: '100%',
        ...sx
      }}
      className={className}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? 'outlined' : undefined}
    >
      {title && (
        <CardContent sx={{ pb: 0 }}>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
      )}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
