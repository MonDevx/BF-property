import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
function Checkboxform(props) {
  /* TODO  FIX LIST ITEM TO SUPPORT MULTIPLE LANGUAGES  */
  const { formValues, setFormValues } = props;
  const [items, setitems] = React.useState([
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
  ]);
  const [items2, setitems2] = React.useState([
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
  ]);
  const checkboxhandleChange = (event) => {
    setitems(
      items.map((item) =>
        item.name === event.target.name
          ? { ...item, checked: event.target.checked }
          : item
      )
    );
  };
  const checkbox2handleChange = (event) => {
    setitems2(
      items2.map((item) =>
        item.name === event.target.name
          ? { ...item, checked: event.target.checked }
          : item
      )
    );
  };
  const saveFruits2 = () => {
    setFormValues({ ...formValues, furniture: items, centralservice: items2 });
  };
  useEffect(() => {
    saveFruits2();
  }, [items, items2]);
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          {t("facilityformtopic1.label")}
        </Typography>


        {items.map((item, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                label={item.name}
                onChange={checkboxhandleChange}
                checked={item.checked}
                name={item.name}
                color="primary"
              />
            }
            label={item.name}
          />
        ))}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          {t("facilityformtopic2.label")}
        </Typography>
        {items2.map((item, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                label={item.name}
                onChange={checkbox2handleChange}
                checked={item.checked}
                name={item.name}
                color="primary"
              />
            }
            label={item.name}
          />
        ))}
      </Grid>
    </React.Fragment>
  );
}
export default Checkboxform;
