document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const regionSelect = document.getElementById('region');
    const provinceSelect = document.getElementById('province');
    const citySelect = document.getElementById('city');
    const barangaySelect = document.getElementById('barangay');

    // PSGC API Base URL
    const PSGC_API_URL = 'https://psgc.gitlab.io/api';

    // Fetch and populate regions
    async function fetchRegions() {
        try {
            const response = await fetch(`${PSGC_API_URL}/regions/`);
            const regions = await response.json();
            console.log('Regions:', regions); // Debugging
            populateDropdown(regionSelect, regions, 'regionName');
        } catch (error) {
            console.error('Error fetching regions:', error);
        }
    }

    // Fetch and populate provinces based on selected region
    async function fetchProvinces(regionCode) {
        try {
            const response = await fetch(`${PSGC_API_URL}/regions/${regionCode}/provinces/`);
            const provinces = await response.json();
            console.log('Provinces:', provinces); // Debugging
            populateDropdown(provinceSelect, provinces, 'provinceName');
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    }

    // Fetch and populate cities/municipalities based on selected province
    async function fetchCities(provinceCode) {
        try {
            const response = await fetch(`${PSGC_API_URL}/provinces/${provinceCode}/cities-municipalities/`);
            const cities = await response.json();
            console.log('Cities:', cities); // Debugging
            populateDropdown(citySelect, cities, 'name');
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    }

    // Fetch and populate barangays based on selected city/municipality
    async function fetchBarangays(cityCode) {
        try {
            const response = await fetch(`${PSGC_API_URL}/cities-municipalities/${cityCode}/barangays/`);
            const barangays = await response.json();
            console.log('Barangays:', barangays); // Debugging
            populateDropdown(barangaySelect, barangays, 'name');
        } catch (error) {
            console.error('Error fetching barangays:', error);
        }
    }

    // Populate dropdown with fetched data
    function populateDropdown(dropdown, items, itemName) {
        dropdown.innerHTML = '<option disabled selected>Select</option>';
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item.code;
            option.textContent = item[itemName];
            dropdown.appendChild(option);
        });
    }

    // Event listeners for dynamic dropdowns
    regionSelect.addEventListener('change', function () {
        const regionCode = this.value;
        console.log('Selected Region Code:', regionCode); // Debugging
        fetchProvinces(regionCode);
        citySelect.innerHTML = '<option disabled selected>Select City/Municipality</option>';
        barangaySelect.innerHTML = '<option disabled selected>Select Barangay</option>';
    });

    provinceSelect.addEventListener('change', function () {
        const provinceCode = this.value;
        console.log('Selected Province Code:', provinceCode); // Debugging
        fetchCities(provinceCode);
        barangaySelect.innerHTML = '<option disabled selected>Select Barangay</option>';
    });

    citySelect.addEventListener('change', function () {
        const cityCode = this.value;
        console.log('Selected City Code:', cityCode); // Debugging
        fetchBarangays(cityCode);
    });

    // Initial fetch of regions
    fetchRegions();
});
