import CustomFormLabel from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel";
import { commonFieldLabelStyle, fieldLabel } from "@/utils/commonstyles";
import { Button, Popover, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { InfoIcon } from "../Icons";
import { id } from "date-fns/locale";
import Image from "next/image";
interface massImport {
  title: any;
  handleFileUpload?: any;
}
const MassImport: React.FC<massImport> = ({ title, handleFileUpload }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Stack>
      <Typography
        variant="paragraph3"
        component={"p"}
        sx={{ ...commonFieldLabelStyle, mb: "12px",display:"flex",alignItems:"center",gap:"5px" }}
      >
        {title}
        { ["Question Mass Import", "Trainee Mass Import"].includes(title) && 
          <Button 
          onMouseEnter={handleClick}
          onMouseLeave={handleClose} 
          sx={{
            p:"0px",
            background:"transparent",
            minWidth:"auto",
            '&:hover':{
              background:"transparent",
            },
            '& svg path':{
              fill: theme.palette.mode === 'light' ? 'rgb(42, 46, 49)' : '#fff'
            }
          }}>
            <InfoIcon />
          </Button>
        }
        <Popover
          sx={{
            pointerEvents:"none"
          }}
          id="mouse-over-popover"
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: { width: 600, minWidth: 600,p:"32px",
              bgcolor:theme.palette.mode === 'light' ? '#EFEFEF' : '#191b1d',
              borderRadius:"15px",
              boxShadow:"2px 2px 10px 0px #9999991A",
              position:"relative",
              overflow:"visible",
              marginLeft:"-20px",
              marginTop:"10px",
              "&::before": {
              content: '""',
              position: "absolute",
              bottom: "100%",
              left: "30px",
              transform: "translateX(-50%)",
              border: "10px solid transparent",
              borderStyle: "solid",
              borderColor: `transparent transparent ${theme.palette.mode === 'light' ? '#EFEFEF' : '#191b1d'} transparent`,
            },
             },
          }}
          onClose={handleClose}
          disableRestoreFocus
        >
          <Typography variant="h3" mb={"12px"}>{title} CSV Template</Typography>
          {title === 'Question Mass Import' &&  <Typography variant="body3" component={"p"} sx={{
          }} mb={"24px"}>Export the questions you would like to import from <strong>PrepX Question Bank</strong> by selecting the questions and click export. Then import the CSV file to this section.</Typography>}
            {title === 'Trainee Mass Import' &&   <Typography variant="body3" component={"p"} sx={{
          }} mb={"24px"}>Import trainee data using the provided spreadsheet(CSV file). Then import the CSV file to this section.</Typography>}
         
          <Stack sx={{
            '& img':{
              objectFit:"cover",
              objectPosition:"top"
            }
          }}>
            {title === 'Question Mass Import' && <Image src={"/images/csv-img.png"} priority alt="" height={170} width={536} />}
            {title === 'Trainee Mass Import' &&  <Image src={"/images/csv-img-01.png"} priority alt="" height={170} width={536} />}
          </Stack>
        </Popover>
      </Typography>
      <Stack
        direction={"row"}
        sx={{
          border: "1px solid #738A9633",
          borderRadius: "4px",
          "& input": {
            flex: "1 1 auto",
            p: "14px 8px",
          },
          "& ::file-selector-button": {
            display: "none",
          },
        }}
      >
        <input
          id="upload-files"
          type="file"
          onChange={(e) => handleFileUpload(e.target.files)}
        />
        <Button
          sx={{
            background: "#fff",
            color: "#4F595F",
            width: "fit-content",
            borderRadius: "0px 4px 4px 0",
            borderLeft: "1px solid #738A9633",
          }}
          onClick={() => document?.getElementById("upload-files")?.click()} // Trigger file input click
        >
          Import
        </Button>
      </Stack>
    </Stack>
  );
};

export default MassImport;
