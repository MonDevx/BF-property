import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Checkinformation from "./check-information.component.jsx";
import InformationForm from "./input-information-form.component.jsx";
import HousetypeForm from "./input-type-form.component.jsx";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: "75%",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function Addlisting(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [formValues, setFormValues] = React.useState({
    idtype: 0,
    name: "",
    filesoutside: [],
    filesinside: [],
    sizefamily: 1,
    detail: "",
    latitude: 13.750573,
    longitude: 100.498519,
    Numberofbedrooms: 0,
    Numberofbathrooms: 0,
    Yearofconstruction: new Date(),
    Numberofparkingspace: 0,
    Numberoffloors: 0,
    price: 0,
    Housesize: 0,
    province: "",
    District: "",
    subDistrict: "",
    zipCode: "",
    Landmark: "",
    Address: "",
    countview: 0,
    centralservice: [
      {
        name: "เครื่องปรับอากาศ",
        checked: false,
      },
      {
        name: "พัดลม",
        checked: false,
      },
      {
        name: "เครื่องฟอกอากาศ",
        checked: false,
      },
      {
        name: "เครื่องทำน้ำอุ่น",
        checked: false,
      },
      {
        name: "ตู้เย็น",
        checked: false,
      },

      {
        name: "ตู้เสื้อผ้า",
        checked: false,
      },
      {
        name: "ชุดโต๊ะเก้าอี้",
        checked: false,
      },
      {
        name: "โซฟา",
        checked: false,
      },
      {
        name: "เตียง",
        checked: false,
      },
    ],
    furniture: [
      {
        name: "เจ้าหน้าที่รักษาความปลอดภัย",
        checked: false,
      },
      {
        name: "สระว่ายน้ำ",
        checked: false,
      },
      {
        name: "ฟิตเนส",
        checked: false,
      },
      {
        name: "สนามเด็กเล่น",
        checked: false,
      },
      {
        name: "รถรับส่ง",
        checked: false,
      },
    ],
    Nearbyplaces: [],
    CreateAt: new Date(),
  });
  const handleNext = (newValues) => {
    if (activeStep === 0) {
      if (newValues === 3) {
        setFormValues({
          ...formValues,
          idtype: newValues,
          projectname: "",
          building: "",
        });
      } else {
        setFormValues({ ...formValues, idtype: newValues });
      }
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = (newValues) => {
    setFormValues({ ...formValues, ...newValues });
    setActiveStep(activeStep - 1);
  };
  const { t } = useTranslation();
  const steps = [
    t("typehouse.label"),
    t("forminfoheader.label"),
    t("checkhouseinfoheader.label"),
  ];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <HousetypeForm handleNext={handleNext} />;
      case 1:
        return (
          <InformationForm
            formValues={formValues}
            setFormValues={setFormValues}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );

      case 2:
        return (
          <Checkinformation
            {...formValues}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4">{t("addlistingheader.label")}</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === 0 ? (
              <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
            ) : (
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <div align="center">
                      <img
                        alt=""
                        src="./assets/img/svg/Illustration/Illustration-sucsses.svg"
                        width="100%"
                        height="350px"
                      ></img>
                      <Typography variant="h5" gutterBottom>
                        {t("addlistingsucess.label")}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        component={RouterLink}
                        to="/"
                      >
                        {t("gobackfirstpage.label")}
                      </Button>
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
