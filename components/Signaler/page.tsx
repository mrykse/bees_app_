import React, { useRef, useState } from 'react';
import { Button, Card, CardBody, Checkbox, CheckboxGroup, Input, Textarea } from '@nextui-org/react';
import { Home, Phone } from 'lucide-react';
import dynamic from "next/dynamic";
import MapComponent from "@/components/Signaler/Map";
import style from "./style_signaler.module.css";

export const Support = () => {
    const [firstName, setFirstName] = useState<string>('John');
    const [lastName, setLastName] = useState<string>('Doe');
    const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
    const [isInvalidPhoneNumber, setIsInvalidPhoneNumber] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('user@examng.net');
    const [phoneNumber, setPhoneNumber] = useState<string>('+33 06 12 34 56 78');
    const [isInvalid, setIsInvalid] = useState<boolean>(true);
    const [selected, setSelected] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');
    const [adressePostale, setAdressePostale] = useState<string>('30-32 Av. de la République, 94800 Villejuif');
    const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
    const [shouldZoom, setShouldZoom] = useState<boolean>(false);
    const [showPopUp, setShowPopUp] = useState<boolean>(false);
    const [showConfirmationPopUp, setShowConfirmationPopUp] = useState<boolean>(false);
    const [showIncompleteDataPopUp, setShowIncompleteDataPopUp] = useState<boolean>(false);
    const [showExistingDataPopUp, setShowExistingDataPopUp] = useState<boolean>(false);
    const emailValidationRegex = useRef<RegExp>(/(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*:(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)(?:,\s*(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*))*)?;\s*)/);
    const phoneNumberValidationRegex = useRef<RegExp>(/^(\+\d{1,3})?(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/);

    const isValidEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(emailValidationRegex.current);
    };

    const isValidPhoneNumber = (phoneNumber: string) => {
        return String(phoneNumber)
            .match(phoneNumberValidationRegex.current);
    };

    // Check if all required fields are filled and aren't just filled with spaces
    const isFormValid = () => {
        if (firstName.trim() == '' || lastName.trim() == '' || email.trim() == '' || phoneNumber.trim() == '' || adressePostale.trim() == '' || selected.length <= 0 || message.trim() == '') {
            setShowIncompleteDataPopUp(true);
            setTimeout(() => setShowIncompleteDataPopUp(false), 2000);
        }
        else {
            setShowPopUp(true);
        }
        return;
    };

    const handleConfirmedSending = async () => {
        try {

            const payload = {
                nom: firstName,
                prenom: lastName,
                email: email,
                telephone: phoneNumber,
                adresse_postale: adressePostale,
                message: message,
                inquiry_type: selected.join(', '),
                status_inquiry: "non_consulte"
            };

            const response = await fetch('http://localhost:3000/api/interventions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setShowConfirmationPopUp(true);
                setShowPopUp(false);
                setTimeout(() => setShowConfirmationPopUp(false), 2000);
            } else if (response.status === 404){
                setShowConfirmationPopUp(false);
                setShowExistingDataPopUp(true);
                setTimeout(() => setShowExistingDataPopUp(false), 2000);
            }

        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const fetchCoordinates = async () => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(adressePostale)}`);
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                setCoordinates([parseFloat(lat), parseFloat(lon)]);
                setShouldZoom(true);
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error);
        }
    };

    const handleAddressChange = (value: string) => {
        setAdressePostale(value);
    };

    return (
        <>
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
                            isRequired
                            value={firstName}
                            type="text"
                            label="First Name"
                            variant="underlined"
                            onValueChange={setFirstName}
                            className="max-w-xs"
                        />
                        <Input
                            isRequired
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
                            isRequired
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
                            isRequired
                            value={phoneNumber}
                            type="tel"
                            label="Phone Number"
                            variant="underlined"
                            isInvalid={isInvalidPhoneNumber}
                            onValueChange={(value: string) => {
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
                            isRequired
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
                        onValueChange={(value: string[]) => {
                            setIsInvalid(value.length < 1);
                            setSelected(value);
                            console.log("User choice:", value);
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
                        <Button
                            color="success"
                            variant="shadow"
                            onClick={() => {
                                isFormValid();
                            }}
                            className='xl:w-3/12 lg:h-16 lg:text-lg text-white my-6 max-md:my-4'
                        >
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
                            <button onClick={() => {
                                handleConfirmedSending();
                            }}>Envoyer
                            </button>

                        </div>
                    </div>
                </div>
            )}
            {showConfirmationPopUp && (
                <div className={style.popupOverlay}>
                    <div className={style.popup}>
                        <h2>Confirmation</h2>
                        <p>Super ! Votre signalement a bien été reçu 🌟 Nous interviendrons rapidement !</p>
                    </div>
                </div>
            )}
            {showIncompleteDataPopUp && (
                <div className={style.popupOverlay}>
                    <div className={style.popup}>
                        <h2>Attention</h2>
                        <p>Un ou plusieurs champs ne sont pas remplis.</p>
                    </div>
                </div>
            )}
            {showExistingDataPopUp && (
                <div className={style.popupOverlay}>
                    <div className={style.popup}>
                        <h2>Oups...</h2>
                        <p>Nous avons déjà pris en compte ce signalement !</p>
                    </div>
                </div>
            )}
        </>
    );
};
