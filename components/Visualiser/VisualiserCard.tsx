import React, { useEffect, useState } from 'react';
import {
    Tooltip,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Chip,
    User,
    Pagination,
} from '@nextui-org/react';
import { SearchIcon } from './SearchIcon';
import { Trash } from 'react-bootstrap-icons';
import style from './style_visualiser.module.css';

// Define columns and statusOptions directly in the component
const columns = [
    { uid: 'avertisseur', name: 'Avertisseur' },
    { uid: 'adresse_postale', name: 'Adresse Postale' },
    { uid: 'telephone', name: 'Téléphone' },
    { uid: 'email', name: 'Email' },
    { uid: 'inquiry_type', name: 'Inquiry_type' },
    { uid: 'message', name: 'Message' },
    { uid: 'status_inquiry', name: 'Status_inquiry' },
];

const statusOptions = ['consulte', 'non_consulte'];

const statusColorMap = {
    consulte: 'success',
    non_consulte: 'danger',
};

const INITIAL_VISIBLE_COLUMNS = ['avertisseur', 'adresse_postale', 'telephone', 'email', 'inquiry_type', 'message', 'status_inquiry'];

const VisualiserCard = () => {
    const [filterValue, setFilterValue] = useState('');
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState('all');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [interventions, setInterventions] = useState([]);
    const [toggledStatus, setToggledStatus] = useState({});
    const [showPopUp, setShowPopUp] = useState(false); // State to control the visibility of the pop-up
    const [elementsToDelete, setElementsToDelete] = useState([]); // State to store elements to be deleted

    const [sortDescriptor, setSortDescriptor] = useState({
        column: 'avertisseur',
        direction: 'ascending',
    });
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchInterventions();
    }, []);

    const fetchInterventions = async () => {
        try {
            const response = await fetch('/api/interventions'); // Assuming your backend endpoint is /api/interventions
            const data = await response.json();
            setInterventions(data.interventions);
        } catch (error) {
            console.error('Error fetching interventions:', error);
        }
    };

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === 'all') return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredInterventions = [...interventions];

        if (hasSearchFilter) {
            console.log('Filtering interventions by search filter...');
            filteredInterventions = filteredInterventions.filter((intervention) => {
                const fullName = `${intervention.prenom} ${intervention.nom}`;
                const lowerCaseFullName = fullName && fullName.toLowerCase();
                const lowerCaseFilterValue = filterValue.toLowerCase();
                console.log('Intervention name:', lowerCaseFullName);
                console.log('Filter value:', lowerCaseFilterValue);
                return lowerCaseFullName && lowerCaseFullName.includes(lowerCaseFilterValue);
            });
        }
        if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
            console.log('Filtering interventions by status filter...');
            filteredInterventions = filteredInterventions.filter((intervention) => Array.from(statusFilter).includes(intervention.status));
        }

        return filteredInterventions;
    }, [interventions, filterValue, statusFilter]);

    const handleDeleteSelected = async () => {
        try {
            // Get the IDs of selected interventions
            const selectedIds = Array.from(selectedKeys);

            // Display confirmation popup
            setShowPopUp(true);
            setElementsToDelete(selectedIds);

        } catch (error) {
            console.error('Error deleting interventions:', error);
        }
    };

    const handleConfirmedDeletion = async () => {
        try {
            // Delete interventions with the selected IDs
            await Promise.all(elementsToDelete.map(async (id) => {
                await fetch(`/api/interventions/${id}`, {
                    method: 'DELETE',
                });
            }));
            // Fetch interventions again to update the list
            fetchInterventions();
            // Clear the selected keys
            setSelectedKeys(new Set());
            // Close the popup
            setShowPopUp(false);
        } catch (error) {
            console.error('Error deleting interventions:', error);
        }
    };


    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === 'descending' ? -cmp : cmp;
        })
    }, [sortDescriptor, items]);

    const toggleStatus = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'consulte' ? 'non_consulte' : 'consulte';
            await fetch(`/api/interventions/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ newStatus }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // Update the status locally
            setInterventions(prevInterventions => {
                return prevInterventions.map(intervention => {
                    if (intervention._id === id) {
                        return { ...intervention, status_inquiry: newStatus };
                    }
                    return intervention;
                });
            });
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const deleteButton = selectedKeys.size > 0 && (
        <Tooltip content="Delete Selected">
            <Trash
                size={20}
                className="text-red-600 cursor-pointer"
                onClick={handleDeleteSelected}
            />
        </Tooltip>
    );


    const renderCell = React.useCallback((intervention, columnKey) => {
        const cellValue = intervention[columnKey];
        switch (columnKey) {
            case 'avertisseur':
                return (

                    <User description={`${intervention.prenom} ${intervention.nom}`} name={cellValue}>
                        {cellValue}
                    </User>

                );
            case 'adresse_postale':
                return (
                    <p className="text-bold text-small capitalize">{intervention.adresse_postale}</p>
                );
            case 'telephone':
                return (
                    <p className="text-bold text-small capitalize">{intervention.telephone}</p>
                );
            case 'email':
            case 'inquiry_type':
                return <p>{cellValue}</p>;
            case 'status_inquiry':
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[intervention.status_inquiry]}
                        size="sm"
                        variant="flat"
                        onClick={() => toggleStatus(intervention._id, intervention.status_inquiry)}
                    >
                        {intervention.status_inquiry}
                    </Chip>
                );


            default:
                return cellValue;
        }
    }, [interventions]);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue('');
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue('');
        setPage(1);
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4 justify-between">
                <div className="flex items-center gap-2">
                    <label className="flex text-default-400 text-small ml-auto">
                        Students per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
                <Input
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    placeholder="Search by name..."
                    startContent={<SearchIcon />}
                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                />
            </div>
        );
    }, [filterValue, statusFilter, visibleColumns, onRowsPerPageChange, interventions.length, onSearchChange, hasSearchFilter, selectedKeys]);

    const bottomContent = React.useMemo(() => {
        return (
            <div>
                <label className="flex items-center text-default-400 text-small ml-2.5">
                    Showing {items.length} data of {filteredItems.length} students
                </label>
                <div className="py-2 px-2 flex items-center justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={pages}
                        onChange={setPage}
                    />
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <div>
            <Table
                aria-label="Example table with custom cells, pagination and sorting"
                isHeaderSticky
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                height="100%"
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={[{ uid: 'actions', name: '' }, ...headerColumns]}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === 'actions' ? 'center' : 'start'}
                            allowsSorting={column.sortable}
                        >
                            {column.uid === 'actions' ? deleteButton : column.name}
                        </TableColumn>
                    )}
                </TableHeader>

                <TableBody emptyContent={'No interventions found'} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item._id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {showPopUp && (
                <div className={style.popupOverlay}>
                    <div className={style.popup}>
                        <h2>Confirmation</h2>
                        <p>Êtes-vous sûr de vouloir supprimer {elementsToDelete.length === 1 ? 'cet élément' : 'ces éléments'} définitivement ?</p>
                        <div className={style.actions}>
                            <button onClick={() => setShowPopUp(false)}>Annuler</button>
                            <button onClick={handleConfirmedDeletion}>Confirmer</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisualiserCard;