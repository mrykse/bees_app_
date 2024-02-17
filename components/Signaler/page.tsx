import React, { useRef, useState } from 'react';
import { Button, Card, CardBody, Checkbox, CheckboxGroup, Input, Textarea } from '@nextui-org/react';
import { Home, Phone } from 'lucide-react';
import LeafletMap from "@/components/Signaler/LeafletMap";
import dynamic from "next/dynamic";
import MapComponent from "@/components/Signaler/Map";
// import { envConfig.tsx } from '@/config/envConfig.tsx';
// import httpClient from "@/utils/httpClient";
import style from "./style_signaler.module.css";

export const Support = () => {
    const [firstName, setFirstName] = useState<string>('John');
    const [lastName, setLastName] = useState<string>('Doe');
    const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
    const [isInvalidPhoneNumber, setIsInvalidPhoneNumber] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('user@examng.net');
    const [phoneNumber, setPhoneNumber] = useState<string>('+33 06 12 34 56 78');
    const [isInvalid, setIsInvalid] = useState<boolean>(true);
    const [selected, setSelected] = useState<string[]>([]); // Explicitly specify type as string[]
    const [message, setMessage] = useState<string>('');
    const [adressePostale, setAdressePostale] = useState<string>('30-32 Av. de la République, 94800 Villejuif');
    const [coordinates, setCoordinates] = useState<[number, number] | null>(null); // State to store coordinates
    const [shouldZoom, setShouldZoom] = useState<boolean>(false); // State for triggering zoom
    const [showPopUp, setShowPopUp] = useState<boolean>(false); // State to control the visibility of the pop-up
    const [showConfirmationPopUp, setShowConfirmationPopUp] = useState<boolean>(false); // State to control the visibility of the confirmation pop-up
    // eslint-disable-next-line no-useless-escape
    const emailValidationRegex = useRef<RegExp>(/(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*:(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)(?:,\s*(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*))*)?;\s*)/);
    const phoneNumberValidationRegex = useRef<RegExp>(/^(\+\d{1,3})?(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/);

    const Map = dynamic(() => import("./Map"), { ssr: false });

    const isValidEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(emailValidationRegex.current);
    };

    const isValidPhoneNumber = (phoneNumber: React.SetStateAction<string>) => {
        return String(phoneNumber)
            .match(phoneNumberValidationRegex.current);
    };

   /* const sendEmail = async () => {
        try {
            //prepare a json with "to", "subject" and "text" fields
            const email = {
                to: 'examng0@gmail.com',
                subject: selected.join(', '),
                body: message,
            }
            //const response = await httpClient.post<Exam>(`/email/send`, email);


            /!*if (response.data.success) {
                console.log('Email sent successfully');
                // You can add additional logic or UI updates here
            } else {
                console.error('Failed to send email:', response.data.error);
                // Handle error cases
            }*!/
        } catch (error) {
            console.error('Error sending email:', error);
            // Handle error cases
        }
    };*/

    const handleConfirmedSending = async () => {
        try {
            if (!isValidEmail(email) || !isValidPhoneNumber(phoneNumber)) {
                alert('Please enter a valid email and phone number.');
                return;
            }
            setShowPopUp(true);
            setShowConfirmationPopUp(false);

        } catch (error) {
            console.error('Error sending message:', error);
            // Handle error cases
        }
    };

    // Function to send the values to database
    const sendValuesToDatabase = async () => {
        try {
            // Prepare the payload
            const payload = {
                nom: firstName,
                prenom: lastName,
                email: email,
                telephone: phoneNumber,
                adresse_postale: adressePostale,
                message: message,
                // Add selected values from the checkbox group
                inquiry_type: selected.join(', '),
                status_inquiry: "non_consulte"
            };

            // Make a POST request to your API route
            const response = await fetch('http://localhost:3000/api/interventions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log('Data sent successfully');
                setShowConfirmationPopUp(true);
                // You can add additional logic or UI updates here
            } else {
                console.error('Failed to send data:', response.statusText);
                // Handle error cases
            }
        } catch (error) {
            console.error('Error sending data:', error);
            // Handle error cases
        }
    };

    const fetchCoordinates = async () => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(adressePostale)}`);
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                setCoordinates([parseFloat(lat), parseFloat(lon)]);
                setShouldZoom(true); // Set shouldZoom to trigger zoom
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error);
        }
    };

    // Function to handle address change
    const handleAddressChange = (value: string) => {
        setAdressePostale(value);
    };

    return (
        <>
            <img className={style.image_haut} src="/abeille_haut.svg" alt="image"/>

            <Card className={`w-1/2 h-1/2 ml-72 `}>
                <CardBody className='flex flex-col justify-center items-start px-16 py-14 max-lg:px-12 max-lg:py-10'>
                    <h3 className='text-5xl max-md:text-3xl font-semibold tracking-wide antialiased mb-10 max-md:mb-5 text-gray-800'>Buzzez-nous
                        !</h3>
                    <p><span
                        className='text-left font-normal tracking-normal text-lg max-md:text-base text-gray-700/50'>Veuillez saisir l'ensemble des informations demandées, afin qu'on puisse vous aider au mieux ! </span>
                    </p>
                    <div
                        className='flex max-md:flex-col flex-row justify-between items-center w-full mt-20 max-md:mt-14 mb-5'>
                        <Input
                            value={firstName}
                            type="text"
                            label="First Name"
                            variant="underlined"
                            onValueChange={setFirstName}
                            className="max-w-xs"
                        />
                        <Input
                            value={lastName}
                            type="text"
                            label="Last Name"
                            variant="underlined"
                            onValueChange={setLastName}
                            className="max-w-xs"
                        />
                    </div>
                    <div className='flex max-md:flex-col flex-row justify-between items-center w-full mt-5'>
                        <Input
                            value={email}
                            type="email"
                            label="Email"
                            variant="underlined"
                            isInvalid={isInvalidEmail}
                            onValueChange={(value) => {
                                setEmail(value);

                                if (isValidEmail(value)) {
                                    setIsInvalidEmail(false);
                                } else {
                                    setIsInvalidEmail(true);
                                }
                            }}
                            className="max-w-xs"
                        />
                        <Input
                            value={phoneNumber}
                            type="tel"
                            label="Phone Number"
                            variant="underlined"
                            isInvalid={isInvalidPhoneNumber}
                            onValueChange={(value: React.SetStateAction<string>) => {
                                setPhoneNumber(value);

                                if (isValidPhoneNumber(value)) {
                                    setIsInvalidPhoneNumber(false);
                                } else {
                                    setIsInvalidPhoneNumber(true);
                                }
                            }}
                            className="max-w-xs"
                        />
                    </div>
                    <div className='flex max-md:flex-col flex-row justify-between items-center w-full mt-5'>
                        <Input
                            value={adressePostale}
                            type="Adresse postale"
                            label="Adresse postale"
                            variant="underlined"
                            isInvalid={isInvalidEmail}
                            onValueChange={(value) => {
                                setAdressePostale(value);

                            }}
                            className="max-w-xs"
                        />
                        {/*<Map coordinates={[48.856613, 2.352222]}/>*/}

                        <Button color="success" variant="shadow" className='text-white' onClick={fetchCoordinates}>Trouver
                            sur la carte</Button>
                    </div>
                    <CardBody className='flex flex-col justify-center items-start'>
                        {coordinates && <MapComponent coordinates={coordinates}/>}
                    </CardBody>
                    <CheckboxGroup
                        isRequired
                        orientation='horizontal'
                        isInvalid={isInvalid}
                        label="Select subject"
                        color='default'
                        onValueChange={(value: string[]) => { // Modifier le type attendu pour string[]
                            setIsInvalid(value.length < 1);
                            setSelected(value);
                            console.log("User choice:", value); // Logging the user's choice
                        }}
                        value={selected}
                        className='my-14 max-md:my-8'
                    >
                        <Checkbox value="localisation essaim">Localisation d'un Essaim</Checkbox>
                        <Checkbox value="intervention générale">Besoin d'une intervention</Checkbox>
                    </CheckboxGroup>


                    <Textarea
                        minRows={1}
                        maxRows={5}
                        isRequired
                        variant='underlined'
                        label="Message"
                        labelPlacement='outside'
                        placeholder="Write your message..."
                        value={message}
                        onValueChange={setMessage}
                        className='mb-14 max-md:mb-8'
                    />
                    <div className='flex max-md:flex-col flex-row justify-between items-center w-full'>
                        {<div className='flex flex-col justify-between items-start'>
                            <h4 className='text-3xl max-md:text-1xl font-medium tracking-normal antialiased text-gray-800'>Let&apos;s
                                talk!</h4>
                            <div>
                                <Phone className='inline-block mr-2 my-6 max-md:my-4'/>
                                <span>+33 06 12 34 56 78</span>
                            </div>
                            <div>
                                <Home className='inline-block mr-2'/>
                                <span>30-32 Av. de la République, 94800 Villejuif</span>
                            </div>

                        </div>}
                        <Button color="success" variant="shadow" onClick={handleConfirmedSending}
                                className='xl:w-3/12 lg:h-16 lg:text-lg text-white my-6 max-md:my-4'>
                            Envoyer
                        </Button>
                    </div>

                </CardBody>
            </Card>
            {showPopUp && (
                <div className={style.popupOverlay}>
                    <div className={style.popup}>
                        <h2>Confirmation</h2>
                        <p>Êtes-vous sûr de vouloir envoyer la demande ?</p>
                        <div className={style.actions}>
                            <button onClick={() => setShowPopUp(false)}>Annuler</button>
                            <button onClick={sendValuesToDatabase}>Envoyer</button>
                        </div>
                    </div>
                </div>
            )}

            {showConfirmationPopUp && (
                <div className={style.popupOverlay}>
                    <div className={style.popup}>
                        <h2>Confirmation</h2>
                        <p>Super! We have received your request! We will intervene shortly!</p>
                        <div className={style.actions}>
                            <button onClick={() => {
                                setShowConfirmationPopUp(false);
                                setShowPopUp(false);
                            }}>OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};
