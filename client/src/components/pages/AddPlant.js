import React, { Component } from "react";
import AddPlantView1 from "./AddPlant/AddPlantView1";
import AddPlantView2 from "./AddPlant/AddPlantView2";
import AddPlantView3 from "./AddPlant/AddPlantView3";
import api from "../../api";



class AddPlant extends Component {
  constructor(props) {
    super(props);

      this.state = {
      name: "",
      view1Clicked: false,
      view2Clicked: false,
      view3Clicked: false,
      watering_interval: "",
      starting_day: new Date(),
      description: "",
      note: "",
      picture_url: ""

    };
    this.handleNameSubmit = this.handleNameSubmit.bind(this)
    this.handleWateringSubmit = this.handleWateringSubmit.bind(this)
    this.handleStartingDaySubmit = this.handleStartingDaySubmit.bind(this)
    this.handleGoBack = this.handleGoBack.bind(this)
  }


  handleGoBack(viewNo) {
    if (!api.isLoggedIn()) {
      this.props.history.push('/login')
      return
     }

    switch(viewNo) {
      case "view2":
      this.setState({view1Clicked: false,
        view2Clicked: false})
      break;
      case "view3":
      this.setState({view2Clicked: true,
        view3Clicked: false})
      break;

      default:
      console.log("Error: Incorrect view was set as a parameter")
      break;
    }
  }

  handleNameSubmit(plantData) {
 if (!api.isLoggedIn()) {
  this.props.history.push('/login')
  return
 }
      this.setState({
        name: plantData.name,
        description: plantData.description,
        picture_url : plantData.pictureUrl,
        view1Clicked: true,
          view2Clicked: true
    })
    console.log("Data", plantData)
}


handleWateringSubmit(checkBoxValue, inputValue, isCheckbox) {
  if (!api.isLoggedIn()) {
    this.props.history.push('/login')
    return
   }

  if (isCheckbox) {
    this.setState({
      watering_interval: checkBoxValue,
      view2Clicked: false,
      view3Clicked: true
    });
  } else {
    this.setState({
      watering_interval: inputValue,
      view2Clicked: false,
      view3Clicked: true
    });
  }
}

handleStartingDaySubmit(startingDay) {
  if (!api.isLoggedIn()) {
    this.props.history.push('/login')
    return
   }
   //Adjusts the starting day to midnight, so it will always be the same day when later calculated in the
   let startingDayAdjusted = startingDay.setHours(0);
   startingDayAdjusted = startingDay.setMinutes(0);
   startingDayAdjusted = startingDay.setSeconds(0);
   startingDayAdjusted = startingDay.setMilliseconds(0);

   let plantData = {
     name: this.state.name,
     watering_interval: this.state.watering_interval,
     starting_day: startingDayAdjusted,
     note: "",
     picture_url: this.state.picture_url,
     description: this.state.description
    };    
        api.addPlant(plantData)
        .then(res => this.props.history.push("/collection"))
      }

      addDefaultSrc() {
        this.setState({picture_url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxETEBMRExIWFhUXFh4YFhgYFhoXGBgeGRkWHx8aFxcYHygsHRsmHxkYITMiJSorLi4uGCAzODMtNygtLisBCgoKDg0OGxAQGzIlIB81Li0tLS83Ly0uLy0yLzUrLSstLy84LS8uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOkA2AMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYDBAcCAf/EAEQQAAICAQIDBQYDBAgDCQEAAAECAAMRBCEFEjEGE0FRYQciMnGBkRQjoUJSYrEVM3KCksHh8CVT0RcmNDVUc4Oishb/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAgMEBQYB/8QAKxEAAgIBBAICAAQHAAAAAAAAAAECAxEEEiExBUFRYRMiMoEUI3GRobHR/9oADAMBAAIRAxEAPwDuMREAREQBERAEREARMd9yopdiFVRkknAAHiTKK3tMSxiNHotTqkBI7xFCIcfulyMj1kZSUVlvAxkv0Sn8E9oujusFNos0tx6V6hTXzf2WOx+8uE+pp8oCIifQIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAifJ9gFC9qNzWnScOUkDU2FrseNVQyy/3iVH3mWutVUKqhVUYVRsAB4ATS7Y/wDnekBOAdHcF+fOmf0E3snG52A+08x5qyTtUPSRr08VtyavGOFU6qs031B18G8R8j4GY/Z7xm+nUvwnVOXKp3mltPxWVg4Kt/Gu30z5Te0+GrBBypAIPgfH/pIPtECmr4bqh8SasIx/htVgR9TiR8VqpQuVbfD/ANn26Ccco6nE8lp9zPUmM+xEQBERAEREAREQBERAEREAREQBERAEREASM7R8aq0ems1NvwoOg6sTsqr6k4Ek5zz2gWd7xDQaU45ED6px5lMJXt8yx+krtsVcHN+j7FZeCDbT8U1h77U6y7TK+60UYXu1PQMxB5mx1majhnEKMNp+KXNj9m9VtRvQ4AIHqJPMSdzv13/0n1q8+Pht6zykvK6ly3KX7G5UwwUPtV2stOp4dZqaTVqabSrcu9VtVgALox3GCB7vhmdAC+6cSK47wWvVV91cu2eZSPiU+DKfP+c+aridq3JpaKe+u5eZhz8iIvTmtfBxnfAAJM+6m96xxaX5l38Y+T5GOzPwbnB9O1dFVbHLKoUn1AkR200OquTTppeUOl4sZ2xyryA4yD194g49Jv8ADuJ2NZZp9RSab0AYKH50dCcc9b4GRnYjqJLVjcbePSZVKdFyk1z39EuJRKzZ2Ua5u81us1F9p68thpRfRErxgT4mh1/D8X6K+2+ofHpr25+YePdv1DeUszKc4xPW42/385oh5PUxnucs/Xog6o44J/s9xmrWaavU0n3HGcHqp8VYeYORJKULsERVr9fpV+BuTUqPAG3mVwB6snN/el8nrKrFZBTXsxtYeDFrNVXUjWWOqIoyzMQqj5kysH2l8H5uX8dVnOM74/xYx9ZWu11f9IcV/C2k/hNIiu6eFlr55QfPCg/f1k5Xw6kIFFVfIBgLyLj7YO0w6vyUKJ7MZfsshU5LJbdBxCm9BZTYliHoyMGH3E2ZybiGkHDLU4jpV7urnC6upThHRjg2cvg6ZzOsAzXp9RG+G+JCUXF4Z9iIl5EREQBERAEREAREQBERAE5n2v8Ad49pyf29Gyr81sBI+xnTJQvaxw1+6o4hUuX0jlmAG7VPgOB8sBvpKdTX+JVKC9olB4kmerH23H16zR19tyAdzV3reRcIq+pJ3x8hPWg1aW1pYjBkcBlOfSb5GG674H6jrPDr8kuV16Ol64NfQteVHfhA3gEZmGPmwGd5qdmuK6evVa6u6xa72uDjvGCd5X3dYQoW6gbjbxkiTg9P12mDU6Gi5cW0o+OnMoPSW1WxTluXD+CEotow6rimn1OupWhxYaFsNtie8iBwAK+cbFiw5seGJl4vww38oGpupUZDCrlHNnzYjI+kz6TS1onLWioo/ZUBR+kiO2faT8BQl/dizNoTlzy7FXJOcHcBZZGUrLYxqX0skcbVyb3B+BU6bnKc7M3V7Hex2+rHb6Ykmpz/AL/395TKvaboQoFi3o7AYRqjzb+XnnaZ6E4hxb8uql9DpD/WXWL+dYM/DWmRyjAO/rNMPH6m6f51j5bIO2KXBOezqwajW6/Wr/VEpp6j4MKuYsw9OZiJ0Azm2u402ndeC8JrTvKUHeWvvXQPNgPisP8AMzFX2Ve051Ov1lr4yeW3uVz/AAqnQfMmd+epo0sVW316MyjKfJ94TyniHFVYe9+JVseODSgU/LYycs1SpZWhIDMG5Rn4uUZOPXG/0la4T2PfS6831auyxLE5bUu99iB8JFgxuPUee8n9XwtXai1wS1Tlkwf3kZTnboQx2nntZOuy9zi+H/h4NUMqOCP7b2ovDNYX+E0sB8zsP1xMXDO2PEtTUg0mkWusKF77UkjmIUDK1ruRnPiJN31KwIbBXb3WGRkHxBmRAAc74+/hsDPum18qK3CC5fs+TrUnlkHquMcfo/M5dJqlAy1davVZj+DLHMt/ZLtLTr9P31WQQeWxG2ath1Vh+vyM0cge8T1/SQvZCsU8a1dafBfpkvPlzo7ISB6g/pOroPITunsn+xTZWorKOhxETsFIiIgCIiAIiIAiIgCfGUEEHcHYifYgHMOK9gtXpbXt4WyGp2LPpbSQoJySam8PkZqnV8ZPujhDBumTfXyfXfpOsxMtuiotlunHkmrJJYTOI8ZXi9er0dF19VRvZmNVAyVRMEl7GG+emBLRx6l20l61ZFjVsF5TgknyPgcTx2sT/j2nLdDorOTPmLEzj1wTJEsfmftOB5TbVfGMIpJLJppzKLbZ9orwACfD/L/SVvt5w8airT0Ngh7zt0+Gi9s/cCWYZxnH6yB11ws19a+FCFm/9y3CqPnyBz/eEzeOi5ahP45GoltrbLJ7LOIG/hWnL72VA0vnc81RK9fkAfrLFxfWdzp7bv3K2b/CCZQ/Zrqu74hxLR4KqzLqKwf41AfH94fpLh2ypL8P1aDqaHx/hM9inlGJPKyUr2dcN5dEl74NupJ1FrftMbcsMn5HP1lm7geHTx3kb2Q1KvoNK46Giv6YQbfoZJvcMGeO1Et1knLvLNseuDyR72QfD/eJXe01r23aTSm5qKr7GDuh5XYojMKw/wCzzEdZn0HBKaXaxe8axurWWM53645jhR8ptcV4dVdX3dtYZCQd+oI6EEdCPOQrthCzK5RJxbRHJo20eppoS97a7QxC2uXsrKAHmVjuUOSDnocTcs4Qv4kak2WkgYVOcitfXkGxPqZh4PwLTaZi9dfvYxzOzWMR5czkkD0mzxri9enqN1zFa1IyQpPXYbCfbLN0/wCXlt8fbCWFybijrvn9DNTsQou4hrNUuClddelRvNlLPZj0BZB95VzxnWcRxTw2mxUbZ9VahREXoTXn4m69Mzp/ZnglWj0temqHuoNz4sx3LH1J3nZ8XoZ1N2WLD9IousT4RKRETtlAiIgCIiAIiIAiIgCIiAIiIBU/aB2Ys1dddmncV6qhuelj0ORhq2/hYfylO/8A6fUUnk1ug1FTjOWrQ3VtjxUp0zOuz5iZdTo6tR+tdE4zlHo5PTx7U6omrQ6K4t/zb1NNKZzuQdzjyEg9ANXpNXfoORdVeSLjcrciZfH9exyVIxgAZOAPp2DtNxQaXR36kj+rrLAeZA2H3xKV2c4WaaFLtzXWHvb3O7PY27En64HoJg1Cp0FX8uPMiW13PEuiJr7M6o6pdYdb3N3J3YNFQxy5zysbCebfx2kk3ajX6Bx+OKanSMeVrkTksqztmxASGXfqJNkb58Okwa3TrZXZW4yrKQcjYg/7E5tHlb4zW55XwXOiOMIq9GuPCbzpNR/4Ox2fSXjdArnPdufDGevjLVp9SrrzIwYHxU5H6Ss63if/AHW0tRRXtuVdNSHUPuGKBwGHVUUkHzxNLTdktKiDAavkQB3W16h6sxVtz1M6Wt8bCyW+Lw2Z/wCJ/D4ayWni/FqNMneX2KgHn1PyXqTNrT6hXrR1+FgGXw2YZ3H1nMdL2EGup1WvUWJQlLfh+d2ay9lB/MJckqnhjxl77LXh9DpXHjQn/wCQD+uZy9boFpq4yzlvs01W72Ozb2ob6bFJCWnu2O/NW/vLufIll/uyU1FK2Ka3UMrDBU9CD1BnrO0+FwASTgAZJz0AnPlNyllcf9LccHj2XP3aavQZJXS34ryc4rtUWKuf4eYiXmUD2UI1g1uuIPLqdQe69UqAQMPng/aX+e5q3bI7u8LJz33wIiJYfBERAEREAREQBERAEREAREQBKLxz2j1pc+m0mns1dybPyELUhHg9p6fQHpJb2h8Sajh1zocO3LUh8mtYID9ObP0le4LwurT0JRWoAUe8RuWPi7eZJ3yekwa/W/w0VhZbLa697IftXxzi+p0rUNw5EDOmSt/OQA4JHKVGcgectXU48fH/AFnmwYJJGcY38/WYOMa9KKjc2Su2ABlmZiFVVz1JYgTzmp1VmrcVJcr4+zTGCgYdN3p1NvMT3QROQYGCxLliD9hMfaHT6i2tatO4rDgiyw7sg22rTxY56nYYmt/SuprsqXU6Pua7SERxarhWPwpaB8JPTbIzN3ifGNNp+Xv7a6y+eXncKSB4gHyzK9lkbFiPPrHPX9D7lNdlVfsTcg05r1r2fh/6qu9QaxnIwOQgjqd95ra97tZqKOFPW1D2vm/fKmpRkmt9uYHGPPfpLtw/iNVy89Vium45lbmGR6iRPbKjGm/EoQLtN+fU3Q5Tcj+yy5BHrOhpPI2/iqF3Pr4aKLdPF/mXo6dptIiVrUigIq8oXwAAxj7TlvEOEa7hbOKaW1WhLF1Cf11HMclAv7SZzidS0OpW2qu1fhdA4+TAEfzmfE9DbTC2O2ayiiMnF5Rx3/tC0uQhr1Af9w0PzfLE2NPodZxUisU2aXRE/mvYOS64D9hFO6qfMzrOIxMlPjNPVPell/ZZK6TWDDotIlVaVVqFRFCqB4AdJniJ0CoREQBERAEREAREQBERAEREAREQCoe1ehm4Xay7mpq7sDqRVYrHH0Bmnw+1bESxCCrIGVh0IIyJd76VdWRhlWBBB8Qes5d/QOu4Y7LTS2s0WSUVGAupDEkphtnWcvyejlfFOHaLqbFFvJJ6rgVV1otY3cy42F9iptjoitjE+8c4Y19LIlnI4ZXrfGQHRgy5XxXIGR5SA13tDSlCW0WtCr8RajkC/NmOJbNPcXSuwIa+dQxU/s5GcEjxnBtrvp2ymsY6NCcZZSIPVrxHVGqvU10VVJYtjtVYztYamDKApA5BzAE7+GJM6qutjugOPMA4z/amHQ8QW5r1AP5Nvdk5GCQqsSB5Dmx9Jn1NwRXJ/ZyxPoBK7rJykljH0vs+xikjGiBeYKowPLGB9pD9ttUKuH6lifiqZFHmzgqAPM5M0U7e6N0HdLe+eirQ/vE/xEYHlnOJsdidO/FNS1+oTu6NHby10E55rQA3PYR4qCMAbZPpNmk8fdK5OawlzyQndFLCOi9mtO1ej01bfEtKKfQhRmScRPVGMREQBERAEREAREQBERAEREAREQBERAEREAT5PsQCme1hf+H8x+Bb6Wt/sLapYn0xMjDIBB2I+mD0P2ln1+jruqemxQyOpVlPQg9ROdnsvxfRnk0llOq042RNQStiD90WL1A9ROZ5LRS1CTh2i2qaj2S+m0KV8+Ngzmw+RJAz9NhKz2s4mtrfgqjknB1DDcJWDuhx+0/THgMnyzqcX4jxf8VTo9QKtMt6sytT+ZZhCMhWfZT73kZ57M0ImnKspDi6xLCd3YqxHOx8yCD9Zio8dKuW+3teiN+pxFqJ94FWM6vTLt3d7MCNgA+LQg9AW/SW32RVY0d5xu2stLeZIKrv9FEqen0RTWald8NVXZt1Jy6nbz2WW32RWA6TUKP2NZaPXfkbf/FOxV+pmSr9TZeYiJoNAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAc+9rCd2eH6v/lapVP8AZtBQ/wA8/SVnS3lNZqkOOdmrtXqVIcFWx5HNYP1l39rOl7zhGqI61qLR/wDGwbb6Ayj3lX1uks5fct07Lnce8vI6hj57viUXIouRk12oCatGJPvUkE53JRl2z57n7SyeyRxjiKj/ANYX/wAdNX/SVXj2kxfpXAyDYyEZx1rc/wA1EsHsqUpq+I1nbJqsx5ZQr/lIUt7v2IU53HSoiJqNQiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAaHHtGLtLfSRkWVOh/vIR/nOM6Gwto+G2lsFLED9erA1kHy3IndDOFWVd3pddUdzp9VYR6ctgsX/AOpErs6KrekSnacla0Zse5qKjnPnaqfyYyU7D2gcb1Cg/Ho6yfmtjj+UjO1OG0dvyVv8Lo3+U2uzPucb0wHR9JaPs6EfzMpq7/uVVdnV4lG9pfbG7RCmnSoLNRYS/KRkCusZYnfx2H1J8MSydl+NprNJTqk2FigkeKnoyn1BBE1GolYiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAnm1sAnyGftPU8XJlSPMEfcQDkvZP2oXhrG16H8O1j91eibVhXYctgXw22b55kfZrNNqNVxXuLFsrtRLVZTtl63VuviCo29ZrdlCtdVmlcYerUWI6nqcuSPoQZiUU0322UV8t1anvagCFurzua18SBkgjyweszynnMTPKecxN3VapbOGWcrrk6XndeYFhzVgjO+280dN2oK63SavT6W29K6HrPIpVWZ+Xo7DcDG82+Jdk6GSoU1qnLYC+Dylq2Pvqx8QRvg+U92ccVleuiprhXkE14SpcdFLt4jyUGQUtvKIJ7eUetENVZddr9Uo7+xeVUGCtCA7IPMnbJ9JbPZASlWs0/hVqmx6d4qvgemWkLw6y01d5d3YYjJ5DlVUdBk9SBmT3shrLaXUaojA1Opd19VXCKfqFk6m3Jtk6m3Jtl8iImg0CIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCDEQDnfbfsVedR/SGgK98QBdU2yXcvQ58H9flKItOqv1zpqjfo7EQWU1+6fNXZGwcjp4zv8r/AGs7JUa7uzY9lVleeS2pgrgNjK5IIKnA2I8JCUEyEoJnLeIaDX8vdd8LqnZUduXkuVSw5jldjttkYIBk/VQlVQRUARV2VQOg8AJtaj2W2Y/K4rq1/thH/kFmsnsp1JOLOL3sniFrCkj5ljj7GVOpsrdTZF8L4bquKoi11tptE2C9rEB7V/cqUHbPiZ17QaOumpKa1CoihVUDAAHSY+EcNr09FenqGK61CqOuw8z5zcl0YqKwi2MVFYQiIkiQiIgCIiAIiIAiIgCIiAIiIAiaN/F6FDfmoeVlVgGBKlnVBzDOwBIznpMtevpYBltQgqWBDggquOZgQegyMnwyIBsxIxuP6UP3ZuQN3nd4LDZuQvvvsMePmQPGbJ4lR7351fufH76+7k4HNvtvtvANqJpW8W065zdXkKWI51zgDOcZ6YnqridDFALqyXGUHOuW+Qzv4/aAbcTTPFKeblFiseYIQrBipOfiAO3SZTq6wned4nJ+/wAw5euPi6dYBniao4jSSgFteXGUHOuWHmu+/wBJ4/pfTZI/EVZBwfzF2OcYO/XO0A3YnwkTX4jrVpqa1gxVQWPKMnAGSdyOgEA2Ympdr1V6kKt+YcK2Pdzys2Cc9cKftMFPGa2dkVXJHPjYYY1nlYLv4HbfGYBJRI08ZTu63COe8JVVwobI5s5ywA+E+M9W8WRbBWQ2SVBOBhS/wg7+PoCIBIRI1eM1lGs5X5AQFbAxYWYKAgzk5YgDIGc+U8W8eqVQxV8++WUAFkFZAcsM9ASOmesAlYmpVr1a01YbIUPnHusCce6c7zbgCIiAIiIAiIgCIiAQr8EYls2jkLo4QIeX3bUsOeZzknlIyAB72cTzreBM3PyWhSy3LvXzAC/uyduYbgoN/U7ScgQCGs4PZ3nOtqjFwtUGsnB7k1MCQ4yCpyMYwfOYaOzvKvLzqQCvKeQ82FtVyrEuQc8uNgPOT8QCK1XCWe1mFoVWUhlVTlsoV94l8HGc7KDt1mA8EsLKWuUjNbOBUQSaW5l5SXPKNhnrnfGMyciAQdnAC9P4d7QawwK8qFXwCThm5zk79cD1BzNm/h1r1qjWrlSjKRVgZQ595ebcHyBGJJxAIa7gzu4drV3NTWAVkZNL8y8hLnkBPUHm+mZ5s7P5XHOB+VdXnk/5zo3N18OXp45k3EA0uLcKq1NJouXmQ4JAJX4SCNx6gT5xXRNbp7KEZU50KczKXADKR0DLn7zenwQCL1PD73OnPe1jum5m/JY855XXb8z3Rhj+9viYtJwNq7mtFiZPeEflYYmxs/msG98L0AwNpNRAINeC2/hxS1lDkMTltOSMNnopt2YEn3s/SeR2dxZW3eghBXuyc1v5QA2t5hgNjcY3yZPRAK5T2X5RgWKMcvdkV43SxXU2+9+YcqB+ztmZbuAOQT3wDsti2N3ZwwuKk8q8/ukcowST45zJ6IBG16CwakWixO7Ffd8ndnmwN88/Pjr/AAySiIAiIgCIiAf/2Q=="})
      }

  render() {
    return (
      <div className="AddPlantView">
      
        {!this.state.view1Clicked && (
          <AddPlantView1 onClick={this.handleNameSubmit} />
        )}
        {this.state.view2Clicked && (
          <AddPlantView2 onError={() => this.addDefaultSrc()} img={this.state.picture_url} onBack={this.handleGoBack} onSubmit={this.handleWateringSubmit} />
        )}
        {this.state.view3Clicked && (
          <AddPlantView3 onBack={this.handleGoBack} onSubmit={this.handleStartingDaySubmit} />
        )}
      </div>
    );
  }
}

export default AddPlant;
