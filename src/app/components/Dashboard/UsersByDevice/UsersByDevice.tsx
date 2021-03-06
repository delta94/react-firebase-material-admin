import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import RefreshIcon from "@material-ui/icons/Refresh";
import TabletMacIcon from "@material-ui/icons/TabletMac";
import clsx from "clsx";
import React from "react";
import { ChartData, Doughnut } from "react-chartjs-2";
import { ITheme } from "../../../theme";
import { ChartOptions } from "chart.js";

export interface IProps {
  className?: string;
}

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    height: "100%"
  },
  chartContainer: {
    position: "relative",
    height: "300px"
  },
  stats: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center"
  },
  device: {
    textAlign: "center",
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const UsersByDevice: React.FC<IProps> = ({ className, ...rest }) => {
  const theme = useTheme<ITheme>();
  const classes = useStyles(theme);

  const data = {
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.error.main,
          theme.palette.warning.main
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ["Desktop", "Tablet", "Mobile"]
  } as ChartData<any>;

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: "index",
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  } as ChartOptions;

  const devices = [
    {
      title: "Desktop",
      value: "63",
      icon: <LaptopMacIcon />,
      color: theme.palette.primary.main
    },
    {
      title: "Tablet",
      value: "15",
      icon: <TabletMacIcon />,
      color: theme.palette.error.main
    },
    {
      title: "Mobile",
      value: "23",
      icon: <PhoneIphoneIcon />,
      color: theme.palette.warning.main
    }
  ];

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
        }
        title="Users By Device"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={data} options={options} />
        </div>
        <div className={classes.stats}>
          {devices.map(device => (
            <div className={classes.device} key={device.title}>
              <span className={classes.deviceIcon}>{device.icon}</span>
              <Typography variant="body1">{device.title}</Typography>
              <Typography style={{ color: device.color }} variant="h2">
                {device.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersByDevice;
