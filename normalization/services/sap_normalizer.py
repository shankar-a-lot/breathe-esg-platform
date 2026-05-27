from normalization.models import EmissionRecord


EMISSION_FACTORS = {
    'Diesel': 2.68,
    'Petrol': 2.31,
}


def normalize_sap_record(raw_record):

    payload = raw_record.raw_payload

    fuel = (
    payload.get('Fuel')
    or payload.get('fuel')
    or payload.get('Fuel Type')
    or payload.get('fuel_type'))

    quantity = quantity = float(
    payload.get('Quantity')
    or payload.get('quantity')
    or 0
)

    unit = payload.get('Unit')

    factor = EMISSION_FACTORS.get(fuel, 0)

    co2e = quantity * factor

    flagged = quantity > 10000

    EmissionRecord.objects.create(
        organization=raw_record.source.organization,
        raw_record=raw_record,
        category='Fuel Combustion',
        scope='Scope 1',
        activity_date='2026-05-01',
        activity_value=quantity,
        activity_unit=unit,
        normalized_value=quantity,
        normalized_unit='liters',
        co2e=co2e,
        is_flagged=flagged
    )